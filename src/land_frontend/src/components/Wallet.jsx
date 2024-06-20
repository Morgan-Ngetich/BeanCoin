import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { CandidInterface } from '@dfinity/agent';
import { idlFactory as walletIdl, canisterId as walletCanisterId } from '../../../declarations/land_backend/land_backend.did';

const agent = new HttpAgent();
const walletInterface = CandidInterface.create(walletIdl);

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBalance();
        fetchAddress();
        fetchTransactionHistory();
    }, []);

    const fetchBalance = async () => {
        try {
            const wallet = walletInterface.createActor(agent, { canisterId: walletCanisterId });
            const balance = await wallet.balance();
            setBalance(balance);
        } catch (error) {
            setError('Failed to fetch balance. Please try again.');
        }
    };

    const fetchAddress = async () => {
        try {
            const wallet = walletInterface.createActor(agent, { canisterId: walletCanisterId });
            const address = await wallet.address();
            setAddress(address.toText());
        } catch (error) {
            setError('Failed to fetch address. Please try again.');
        }
    };

    const fetchTransactionHistory = async () => {
        try {
            const wallet = walletInterface.createActor(agent, { canisterId: walletCanisterId });
            const transactions = await wallet.transactionHistory();
            setTransactionHistory(transactions);
        } catch (error) {
            setError('Failed to fetch transaction history. Please try again.');
        }
    };

    const handleSend = async () => {
        try {
            const wallet = walletInterface.createActor(agent, { canisterId: walletCanisterId });
            const to = Principal.fromText('receiver_principal_here'); // Replace 'receiver_principal_here' with actual principal
            await wallet.send(to, amount);
            fetchBalance();
            fetchTransactionHistory();
        } catch (error) {
            setError('Failed to send coins. Please try again.');
        }
    };

    return (
        <Container>
            <h1 className="text-center my-4">My Crypto Wallet</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSend}>Send</Button>
                    </Form>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>Address: {address}</ListGroup.Item>
                        <ListGroup.Item>Balance: {balance}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="my-4">Transaction History</h2>
                    <ListGroup>
                        {transactionHistory.map((transaction, index) => (
                            <ListGroup.Item key={index}>{transaction}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Wallet;