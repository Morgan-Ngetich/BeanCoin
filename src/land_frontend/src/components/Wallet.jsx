import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as walletIdl } from '/home/morganngetich/MEME/land/src/declarations/land_backend/land_backend.did.js';
import QRCode from 'qrcode.react'; // Import QRCode library

const walletCanisterId = 'rdmx6-jaaaa-aaaaa-aaadq-cai'; // Replace with your actual canister ID
const agent = new HttpAgent();

const createActor = (canisterId, agent) => {
    const actorInterface = walletIdl({ IDL });
    return actorInterface.createActor(agent, { canisterId });
};

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [userPrincipalId, setUserPrincipalId] = useState('');
    const [receiverPrincipalId, setReceiverPrincipalId] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [error, setError] = useState(null);
    const [qrCodeUserPrincipal, setQRCodeUserPrincipal] = useState(null);
    const [qrCodeReceiverPrincipal, setQRCodeReceiverPrincipal] = useState(null);

    useEffect(() => {
        // Fetch balance and transaction history when userPrincipalId changes
        if (userPrincipalId) {
            fetchBalance();
            fetchTransactionHistory();
        }
    }, [userPrincipalId]);

    const fetchBalance = async () => {
        try {
            const wallet = createActor(walletCanisterId, agent);
            const balance = await wallet.balance_of(Principal.fromText(userPrincipalId));
            setBalance(balance);
        } catch (error) {
            setError('Failed to fetch balance. Please try again.');
        }
    };

    const fetchTransactionHistory = async () => {
        try {
            const wallet = createActor(walletCanisterId, agent);
            const transactions = await wallet.get_ledger();
            setTransactionHistory(transactions);
        } catch (error) {
            setError('Failed to fetch transaction history. Please try again.');
        }
    };

    const handleSend = async () => {
        try {
            const wallet = createActor(walletCanisterId, agent);
            const to = Principal.fromText(receiverPrincipalId); // Replace 'receiver_principal_here' with actual principal
            await wallet.transfer(Principal.fromText(userPrincipalId), to, amount);
            fetchBalance();
            fetchTransactionHistory();
        } catch (error) {
            setError('Failed to send coins. Please try again.');
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(`${text} copied to clipboard!`);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleGenerateQR = (principalId) => {
        // This function generates a QR code for the provided principalId
        return (
            <QRCode
                value={principalId}
                size={128}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={true}
                renderAs="svg"
                style={{ margin: 'auto' }}
            />
        );
    };

    return (
        <Container>
            <h1 className="text-center my-4">My Crypto Wallet</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formUserPrincipalId">
                            <Form.Label>Your Principal ID</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="text"
                                    value={userPrincipalId}
                                    onChange={(e) => setUserPrincipalId(e.target.value)}
                                    readOnly
                                />
                                <Button variant="outline-secondary" onClick={() => copyToClipboard(userPrincipalId)}>
                                    Copy
                                </Button>
                                <div>
                                    <Button variant="outline-secondary" onClick={() => setQRCodeUserPrincipal(handleGenerateQR(userPrincipalId))}>
                                        Generate QR
                                    </Button>
                                </div>
                            </div>
                            <div className="text-center">
                                {qrCodeUserPrincipal}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formReceiverPrincipalId">
                            <Form.Label>Receiver Principal ID</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="text"
                                    value={receiverPrincipalId}
                                    onChange={(e) => setReceiverPrincipalId(e.target.value)}
                                    placeholder="Enter receiver's principal ID"
                                />
                                <Button variant="outline-secondary" onClick={() => copyToClipboard(receiverPrincipalId)}>
                                    Copy
                                </Button>
                                <div>
                                    <Button variant="outline-secondary" onClick={() => setQRCodeReceiverPrincipal(handleGenerateQR(receiverPrincipalId))}>
                                        Generate QR
                                    </Button>
                                </div>
                            </div>
                            <div className="text-center">
                                {qrCodeReceiverPrincipal}
                            </div>
                        </Form.Group>
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
