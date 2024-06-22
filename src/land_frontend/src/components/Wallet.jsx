import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal, Alert } from 'react-bootstrap';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as walletIdl } from '/home/morganngetich/MEME/land/src/declarations/land_backend/land_backend.did.js';
import QRCode from 'qrcode.react';
import PrincipalIdContext from './PrincipalIdContext';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [receiverPrincipalId, setReceiverPrincipalId] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success'); // success, danger, etc.
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [qrCodeContent, setQRCodeContent] = useState('');
    const [isPrincipalIdPresent, setIsPrincipalIdPresent] = useState(false); // Track if principalId is present
    const { principalId, setPrincipalId } = useContext(PrincipalIdContext);

    const walletCanisterId = 'rdmx6-jaaaa-aaaaa-aaadq-cai'; // Replace with your actual canister ID
    const agent = new HttpAgent();

    useEffect(() => {
        setIsPrincipalIdPresent(principalId !== ''); // Check if principalId is set initially
    }, [principalId]);

    useEffect(() => {
        if (principalId) {
            fetchBalance();
            fetchTransactionHistory();
        }
    }, [principalId]);

    useEffect(() => {
        if (error) {
            showAlertMessage('Failed to fetch balance. Please try again.', 'danger');
        }
    }, [error]);

    useEffect(() => {
        if (alertMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    const createActor = (canisterId, agent) => {
        const actorInterface = walletIdl({ IDL });
        return actorInterface.createActor(agent, { canisterId });
    };

    const fetchBalance = async () => {
        try {
            const wallet = createActor(walletCanisterId, agent);
            const balance = await wallet.balance_of(Principal.fromText(principalId));
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
            const to = Principal.fromText(receiverPrincipalId);
            await wallet.transfer(Principal.fromText(principalId), to, amount);
            showAlertMessage('Transaction successful!', 'success');
            fetchBalance();
            fetchTransactionHistory();
        } catch (error) {
            setError('Failed to send coins. Please try again.');
        }
    };

    const copyToClipboard = async (text) => {
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                showAlertMessage(`${text} copied to clipboard!`, 'success');
            } catch (error) {
                console.error('Failed to copy:', error);
                showAlertMessage('Failed to copy to clipboard. Please try again.', 'danger');
            }
        } else {
            // Show modal if principalId is not present
            showPrincipalIdPrompt();
        }
    };

    const handleShowQRModal = () => {
        if (isPrincipalIdPresent) {
            setQRCodeContent(principalId); // Set QR code content to principalId
            setShowModal(true); // Open the modal
        } else {
            showPrincipalIdPrompt();
        }
    };

    const handleCloseQRModal = () => {
        setShowModal(false); // Close the modal
    };

    const showPrincipalIdPrompt = () => {
        // Show modal prompting to log in with Internet Identity
        setShowModal(true);
    };

    const handleLoginWithInternetIdentity = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                onSuccess: () => {
                    const principalId = authClient.getIdentity().getPrincipal().toString();
                    setPrincipalId(principalId); // Set principalId in the context
                    setIsPrincipalIdPresent(true); // Now set to true after login
                    setShowModal(false); // Close the modal after successful login
                    showAlertMessage('Logged in successfully!', 'success');
                },
                onError: (error) => {
                    console.error('Failed to authenticate:', error);
                    setError('Failed to authenticate. Please try again.');
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            setError('Failed to authenticate. Please try again.');
        }
    };

    const showAlertMessage = (message, variant) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setAlertMessage('');
        }, 3000);
    };

    return (
        <Container className="wallet-container">
            <h1 className="text-center my-4">My Crypto Wallet</h1>
            {showAlert && <Alert variant={alertVariant} className="alert">{alertMessage}</Alert>}
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formUserPrincipalId">
                            <Form.Label>Your Principal ID</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="text"
                                    value={principalId || ''}
                                    readOnly
                                />
                                <Button variant="outline-secondary" onClick={() => copyToClipboard(principalId)}>
                                    Copy
                                </Button>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formReceiverPrincipalId">
                            <Form.Label>Receiver Principal ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={receiverPrincipalId}
                                onChange={(e) => setReceiverPrincipalId(e.target.value)}
                                placeholder="Enter receiver's principal ID"
                            />
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
                        <Button
                            variant="primary"
                            onClick={handleSend}
                            disabled={!isPrincipalIdPresent} // Disable send button if principalId is not present
                            className="my-button"
                            style={{backgroundColor: 'green', marginTop:"10px", border:"0", width:"100px"}}
                        >
                            Send
                        </Button>
                        <div className="mt-3">
                            <Button
                                variant="outline-secondary"
                                onClick={handleShowQRModal}
                                disabled={!isPrincipalIdPresent} // Disable QR code button if principalId is not present
                                className="my-button"
                            >
                                Generate QR Code P_ID
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item className="my-list-item">Balance: {balance}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="my-4">Transaction History</h2>
                    <ListGroup className="my-list-group">
                        {transactionHistory.map((transaction, index) => (
                            <ListGroup.Item key={index} className="my-list-item">{transaction}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {/* QR Code Modal */}
            <Modal show={showModal} onHide={handleCloseQRModal} backdrop="static" keyboard={false} className="my-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Principal ID Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your Principal ID is not available.</p>
                    <p>Would you like to log in using Internet Identity to obtain your Principal ID?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseQRModal} className="my-button">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLoginWithInternetIdentity} className="my-button wallet-login" style={{maxWidth: "300px"}}>
                        Login with Internet Identity
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Wallet;
