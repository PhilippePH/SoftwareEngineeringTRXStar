// Source to the guide used: https://dev.to/philhardwick/prompt-to-install-a-pwa-on-ios-and-android-with-react-hooks-dkf

import React from 'react';
import { Button, Modal, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import useIosInstallPrompt from './isIOS';
import useWebInstallPrompt from './notIOS';


const InstallPWA = () => {
  const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
  const [installPromptEvent, handleInstallDeclined, handleInstallAccepted] = useWebInstallPrompt();
  console.log(iosInstallPrompt);
  console.log(installPromptEvent);
  if (!iosInstallPrompt && !installPromptEvent) {
    return null;
  }

  console.log("TOYOYOY");
  console.log(iosInstallPrompt);
  console.log(installPromptEvent);

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
          {installPromptEvent && (
            <>
            <div className="d-flex justify-content-around">
              <Button color="primary" onClick={handleInstallAccepted}>
                Install
              </Button>
              <Button onClick={handleInstallDeclined}>Close</Button>
            </div>
            </>
          )}

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