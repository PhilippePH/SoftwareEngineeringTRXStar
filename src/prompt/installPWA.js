import React from 'react';
import { Button, Modal, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import useIosInstallPrompt from './isIOS';

const InstallPWA = () => {
  const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
  
  if (!iosInstallPrompt) {
    return null;
  }

  return (
    <Modal isOpen centered>
      <Card
        style={{
            height: "100%"
        }}
        >
        <CardBody height='90%'>
          <CardTitle className="text-center">
            <h3>Install App</h3>
          </CardTitle>
          {iosInstallPrompt && (
            <>
              <CardText className="text-center">
                Tap
                <img
                  src="/images/shareIcon.png"
                  style={{ margin: 'auto 8px 8px' }}
                  className=""
                  alt="Add to homescreen"
                  width="20"
                />
                then &quot;Add to Home Screen&quot;
              </CardText>
              <div className="d-flex justify-content-center">
                <Button onClick={handleIOSInstallDeclined}>Close</Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </Modal>
  );
};
export default InstallPWA;