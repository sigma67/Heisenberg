import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import React, {Component} from "react";
import QrReader from 'react-qr-reader';

let FontAwesome = require('react-fontawesome');

export default class QRModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showScanner: true
    }
  }
  handleScan = data => {
    if (window.web3.isAddress(data)) {
      let count = this.props.state.transactionLogs.filter(f => f.patientWalletAddress === data);
      //this.props.state.result = data
      this.props.onScan(data);
      //this.props.state.count = count.length
      this.setState({
        result: data,
        count: count.length,
        showScanner: false
      });
    }
  };

  handleError = err => {
    console.error(err)
  };

  toggle(){
    this.setState({
      result: false,
      count: 0
    });
    this.props.toggle();
  }

  rescan(){
    this.setState({
      showScanner: true,
      result: false
    })
  }

  render () {
    return (
      <Modal isOpen={this.props.visibility} toggle={this.toggle}>
        <ModalHeader>Your Account Address</ModalHeader>
        <ModalBody>
          <div>
            { this.state.showScanner ?
              <div>
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{width: '100%'}}
                />
              </div> :
              <div>
                <Button color="success" className="m-1" onClick={this.toggle}>Accept</Button>
                <Button color="secondary" className="m-1" onClick={() => { this.rescan() }}>Rescan</Button>
              </div>
            }<br/>
            { this.state && this.state.result ?
              <p><FontAwesome name='check-circle'/> {this.state.result}<br/>
                {this.state.count.toString()} previous prescriptions filled with this pharmacy.</p> :
              <p><FontAwesome name='times-circle'/> Not a valid address.</p>
            }
          </div>
        </ModalBody>
      </Modal>
    )
  }
}