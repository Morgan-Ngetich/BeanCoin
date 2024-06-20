use ic_cdk::api::caller;
use ic_cdk_macros::{update, query};
use ic_principal::Principal;
use std::collections::{HashMap, VecDeque};
use candid::{CandidType, Deserialize};
use serde::Serialize;

type Balance = u64;

#[derive(CandidType, Deserialize, Serialize)]
struct Transaction {
    from: Principal,
    to: Principal,
    amount: Balance,
    timestamp: u64,
}

struct BeanCoin {
    owner: Principal,
    balances: HashMap<Principal, Balance>,
    ledger: VecDeque<Transaction>,
}

impl BeanCoin {
    pub fn new(owner: Principal) -> Self {
        let mut balances = HashMap::new();
        balances.insert(owner, 1_000_000_000); // Initial mint to owner
        Self { owner, balances, ledger: VecDeque::new() }
    }

    pub fn transfer(&mut self, from: Principal, to: Principal, amount: Balance) -> Result<(), String> {
        if let Some(from_balance) = self.balances.get_mut(&from) {
            if *from_balance >= amount {
                *from_balance -= amount;
                let to_balance = self.balances.entry(to).or_insert(0);
                *to_balance += amount;
                self.record_transaction(from, to, amount);
                return Ok(());
            }
        }
        Err("Insufficient balance".to_string())
    }

    pub fn balance_of(&self, owner: Principal) -> Balance {
        *self.balances.get(&owner).unwrap_or(&0)
    }

    pub fn get_ledger(&self) -> Vec<Transaction> {
        self.ledger.iter().cloned().collect()
    }

    fn record_transaction(&mut self, from: Principal, to: Principal, amount: Balance) {
        let transaction = Transaction {
            from,
            to,
            amount,
            timestamp: ic_cdk::api::time(),
        };
        self.ledger.push_back(transaction);
    }
}

#[update]
fn transfer(from: Principal, to: Principal, amount: Balance) -> Result<(), String> {
    STATE.with(|s| s.borrow_mut().transfer(from, to, amount))
}

#[query]
fn balance_of(owner: Principal) -> Balance {
    STATE.with(|s| s.borrow().balance_of(owner))
}

#[query]
fn get_ledger() -> Vec<Transaction> {
    STATE.with(|s| s.borrow().get_ledger())
}

thread_local! {
    static STATE: std::cell::RefCell<BeanCoin> = std::cell::RefCell::new(BeanCoin::new(caller()));
}
