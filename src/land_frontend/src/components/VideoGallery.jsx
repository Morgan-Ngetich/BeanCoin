import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './VideoGallery.css'; // Import your custom CSS for styling

const VideoGallery = () => {
  const [show, setShow] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    {
      title: 'Video 1',
      id: 'lodp3cVZNCo',
    },
    {
      title: 'Video 2',
      id: 'C1f_BofXMPE',
    },
  ];

  const getYoutubeUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`;

  const handleShow = (index) => {
    setCurrentVideoIndex(index);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="video-gallery">
      <h3>Video Gallery</h3>
      <div className="video-thumbnails">
        {videos.map((video, index) => (
          <div key={index} className="video-thumbnail" onClick={() => handleShow(index)}>
            <img
              className="video-preview"
              src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
              alt={video.title}
            />
            <p className="video-title">{video.title}</p>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="p-0">
          <div className="video-popup">
            <iframe
              className="video-player"
              src={getYoutubeUrl(videos[currentVideoIndex].id)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoGallery;
