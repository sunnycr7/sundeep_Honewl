/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      label: 'Server Details',
      serverName: '',
      operatingSystem: 'Windows Server 2016 Standard',
      ports: '',
      showSuccessSnack: true
    }
    this.date = new Date();
    this.OkayButton = (
      <Button color="primary" size="small" onClick={this.handleReset}>
        OK
      </Button>
    );
  }
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  getSteps() {
    return ['Server Details', 'Confirm', 'Created'];
  }
  
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.insertStepContent();
      case 1:
        return this.insertStepContent2();
      case 2:
        return this.insertStepContent3();
      default:
        return 'Uknown stepIndex';
    }
  }

  createAndDeployInstance() {
    // const script = document.createElement("script");
    // script.src = "./test/test.js";
    // script.async = true;
    // document.body.appendChild(script);

    // var host = {
    //   server:        {     
    //    host:         "129.213.81.136",
    //    userName:     "ubuntu",
    //    privateKey:   "/Users/sandeep/.ssh/id_rsaa"
    //   },
    //   commands:      [ "cd ~/oci-ansible-modules/samples/compute/launch_compute_instance", "ansible-playbook sample.yaml" ]
    //  };
     
    //  var SSH2Shell = require ('ssh2shell'),
    //    //Create a new instance passing in the host object
    //    SSH = new SSH2Shell(host),
    //    //Use a callback function to process the full session text
    //    callback = function(sessionText){
    //      console.log(sessionText)
    //    }
     
    //  //Start the process
    //  SSH.connect(callback);
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    if(activeStep === 1) {
      this.createAndDeployInstance();
    }
  }

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  }

  handleReset = () => {
    // this.setState({
    //   activeStep: 0,
    // });
    this.setState({showSuccessSnack : false});
  }

  handleChange = serverName => event => {
    this.setState({
      serverName: event.target.value,
    });
  };
  handleChange2 = name => event => {
    this.setState({
      ports: event.target.value,
    });
  };

  insertStepContent() {
    let stepArr = [];
    stepArr.push(
      <form noValidate autoComplete="off" className="stepper-form">
        <TextField
          id="server-name"
          label="Server Name"
          value={this.state.serverName}
          onChange={this.handleChange(this.state.serverName, event)}
          margin="normal"
          fullWidth
          margin="normal" required
        /><br/>
        <FormControl 
          fullWidth>
          <InputLabel htmlFor="os-helper">Operating System</InputLabel>
          <Select value={'WINDOWS'}
            input={<Input name="os" id="os-helper" required/>}
            onChange={() => this.setState({operatingSystem: event.target.value})}
          >
            {/* <MenuItem value="">
              <em>Choose</em>
            </MenuItem> */}
            <MenuItem value={'WINDOWS'}>Windows</MenuItem>
            <MenuItem disabled value={'LINUX'}>Linux</MenuItem>
          </Select>
          <FormHelperText>Choose  the  Operating  System</FormHelperText>
        </FormControl><br/>
        <TextField
          id="service-ports"
          label="Service Ports"
          value={this.state.ports}
          onChange={this.handleChange2(this.state.ports, event)}
          fullWidth
          margin="normal" required
        />
        </form>
    )
    return stepArr;
  }
  insertStepContent2() {
    let stepArr = [];
    stepArr.push(
      <div className="stepper-form-2">
      <Grid container spacing={24}>
          <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>SERVER</Grid>
          {/* <Grid item xs={6}>
            <span className="confirm-label-data">Resource group</span>
          </Grid>
          <Grid item xs={6}>
            <span>ntldemo_rg</span>
          </Grid> */}
          <Grid item xs={6}>
            <span className="confirm-label-data">Virtual machine name</span>
          </Grid>
          <Grid item xs={6}>
            <span>{this.state.serverName}</span>
          </Grid>
          <Grid item xs={6}>
            <span className="confirm-label-data">Region</span>
          </Grid>
          <Grid item xs={6}>
            <span>East US 2</span>
          </Grid>
          <Grid item xs={6}>
            <span className="confirm-label-data">Availability Domain</span>
          </Grid>
          <Grid item xs={6}>
            <span>us-ashburn-1</span>
          </Grid>
          <Grid item xs={6}>
            <span className="confirm-label-data">Authentication type</span>
          </Grid>
          <Grid item xs={6}>
            <span>Password</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Username</span>
          </Grid>
          <Grid item xs={6}>
            <span>opc</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Public inbound ports</span>
          </Grid>
          <Grid item xs={6}>
            <span>{this.state.ports}</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">OS</span>
          </Grid>
          <Grid item xs={6}>
            <span>{this.state.operatingSystem}</span>
          </Grid>

          <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>DISKS</Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Image Version</span>
          </Grid>
          <Grid item xs={6}>
            <span>Gen2-2-18.10.13-0 (latest)</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Shape</span>
          </Grid>
          <Grid item xs={6}>
            <span>VM.Standard2.1 (1 OCPU, 15GB RAM)</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Use unmanaged disks</span>
          </Grid>
          <Grid item xs={6}>
            <span>No</span>
          </Grid>

          <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>NETWORKING</Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Virtual network</span>
          </Grid>
          <Grid item xs={6}>
            <span>ntldemo_rg-vnet</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Subnet</span>
          </Grid>
          
          <Grid item xs={6}>
            <span>(new) ntlhwlive-ip</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Accelerated networking</span>
          </Grid>
          <Grid item xs={6}>
            <span>On</span>
          </Grid>

          <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>MANAGEMENT</Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Boot Volume Configuration</span>
          </Grid>
          <Grid item xs={6}>
            <span>46.6 GB</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">OS guest diagnostics</span>
          </Grid>
          <Grid item xs={6}>
            <span>Off</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Diagnostics storage account</span>
          </Grid>
          <Grid item xs={6}>
            <span>ntldemoorgdiag351</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Managed service identity</span>
          </Grid>
          <Grid item xs={6}>
            <span>Off</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Auto-shutdown</span>
          </Grid>
          <Grid item xs={6}>
            <span>Off</span>
          </Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Backup</span>
          </Grid>
          <Grid item xs={6}>
            <span>Disabled</span>
          </Grid>

          <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>INSTANCE CONFIGURATION</Grid>

          <Grid item xs={6}>
            <span className="confirm-label-data">Extensions</span>
          </Grid>
          <Grid item xs={6}>
            <span>None</span>
          </Grid>

        </Grid>
      </div>
    )
    return stepArr;
  }
  getDate() {
    let currdate = new Date();
    let arr = [];
    arr.push(
      <div>{currdate.toString()}</div>
    )
    return arr;
  }
  insertStepContent3() {
    let stepArr = [];
    stepArr.push(
      <div className="stepper-form-3">
      <Grid container spacing={24}>
        {this.state.showSuccessSnack === true ?
        <SnackbarContent className="success-snackbar" xs= {24} style={{ backgroundColor: 'green', width: '100%'}} variant="success" message="Success: Instance was created!" action={this.OkayButton} />
        :
        <div/>
        }
        <Grid item xs={12} className="confirm-label-data" style={{color: '#1792e5'}}>INSTANCE INFORMATION</Grid>

        
        <Grid item xs={3}><b>Virtual Machine Name</b>
        </Grid>
        <Grid item xs={3} >{this.state.serverName}
        </Grid>
        <Grid item xs={3} ><b>Availability Domain</b>
        </Grid>
        <Grid item xs={3} >us-ashburn-1
        </Grid>
            

        
        <Grid item xs={3}><b>Region</b>
        </Grid>
        <Grid item xs={3} >East US 2
        </Grid>

          <Grid item xs={3}><b>Attached Block Volume</b>
          </Grid>
          <Grid item xs={3} >46.6 GB
          </Grid>

        <Grid item xs={3}><b>Virtual Cloud N/W</b>
        </Grid>
        <Grid item xs={3} >ntldemo_rg-vnet
        </Grid>
        <Grid item xs={3} ><b>Image</b>
        </Grid>
        <Grid item xs={3} >Gen2-2-18.10.13-0 (latest)
        </Grid>
            

        
        <Grid item xs={3}><b>Launched Date</b>
        </Grid>
        <Grid item xs={3} >{this.getDate()}
        </Grid>
        <Grid item xs={3} ><b>Private IP Address</b>
        </Grid>
        <Grid item xs={3} >10.0.10.11
        </Grid>
            

        
        <Grid item xs={3}><b>Public IP Address</b>
        </Grid>
        <Grid item xs={3} >129.213.190.145
        </Grid>
        <Grid item xs={3} ><b>Subnet</b>
        </Grid>
        <Grid item xs={3} >(new) ntlhwlive-ip
        </Grid>
            
        <Grid item xs={3} ><b>Shape</b>
        </Grid>
        <Grid item xs={3} >VM.Standard2.1 (1 OCPU, 15GB RAM)
        </Grid>
            

      </Grid>    
      </div>
    )
    return stepArr;
  }
  render() {
    const { loading, error, repos } = this.props;
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <section className="centered">
        <Helmet>
          <title>Honeywell</title>
          <meta name="description" content="Homepage" />
        </Helmet>
        <div className="home-page">
          <section className="">
            <h2>Server Request Form</h2>
            <p>Please fill in all required forms </p>
            <p style={{color: 'red'}}>* Required </p>
          </section>
          <section>
            {/* <h2>Try me!</h2> */}
            {/* <form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
              Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form> */} 
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                {/* <StepContent>{activeStep=== '0' ? label : label}</StepContent> */}
                {/* <StepContent>{
                  // this.insertStepContent(label)
                }</StepContent> */}
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography >
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>RESET</Button>
            </div>
          ) : (
            <div>
              <Typography>{this.getStepContent(activeStep)}</Typography>
              <div> { activeStep === 1 ?
                <Button className="secondary-button-honeywell"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                >
                  BACK
                </Button>
                :
                <div></div>
                }
                {
                activeStep !== 2 ?   
                <Button className="primary-button-honeywell" variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 2 ? 'CREATE' : 'NEXT'}
                </Button>
                :
                <div></div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
          </section>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
