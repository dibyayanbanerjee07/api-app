import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Button
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { Component } from 'react';

import { headerParameters, optionalParameters } from '../constant/constants';

class ParameterForm extends Component {
    state = {
        headerParametersForm: {},
        optionalParametersForm: {},
        submitClicked: false
    };

    componentDidMount = () => {
        let headerParametersFormNew = {};
        let optionalParametersFormNew = {};
        headerParameters.forEach(item => {
            if(item.type === 'text' && item.value === 'x_rapid_api_host') {
                headerParametersFormNew[item.value] =  'eBayBukatiV1.p.rapidapi.com';
            } else if (item.type === 'text' && item.value !== 'x_rapid_api_host') {
                headerParametersFormNew[item.value] =  '';
            }
            if(item.type === 'select') {
                headerParametersFormNew[item.value] = item.options[0].label;
            }
        });
        optionalParameters.forEach(item => {
            if(item.type === 'text') {
                optionalParametersFormNew[item.value] = ''; 
            }
        });
        this.setState({ headerParametersForm: headerParametersFormNew, optionalParametersForm: optionalParametersFormNew });
    };

    handleChange = params => event => {
        if (params === 'header_params') {
            const { headerParametersForm } = this.state;
            let headerFormNew = {};
            headerFormNew[event.target.id] = event.target.value;
            this.setState({
                headerParametersForm: { ...headerParametersForm, ...headerFormNew }
            });
        } else {
            const { optionalParametersForm } = this.state;
            let optionalFormNew = {};
            optionalFormNew[event.target.id] = event.target.value;
            this.setState({
                optionalParametersForm: { ...optionalParametersForm, ...optionalFormNew }
            });
        }
    };

    handleDropDownChange = params => event => {
        const { headerParametersForm } = this.state;
        let headerForm = {};
        headerForm[params] = event.target.value;
        this.setState({
            headerParametersForm: { ...headerParametersForm, ...headerForm }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { headerParametersForm, optionalParametersForm } = this.state;
        let form = { ...headerParametersForm, ...optionalParametersForm };
        fetch("https://ebaybukativ1.p.rapidapi.com/GetAllBidders", {
            "method": "POST",
            "headers": {
                "x-rapidapi-host": form.x_rapid_api_host,
                "x-rapidapi-key": form.x_rapid_api_key,
                "content-type": "application/x-www-form-urlencoded"
            },
            "body": {}
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({
            submitClicked: false
        });
    };

    render() {
        const { headerParametersForm, optionalParametersForm } = this.state;
        console.log(219, headerParametersForm);
        return (
            <>
                <ExpansionPanel defaultExpanded style={{ backgroundColor: '#cfb997', fontWeight: 'bold' }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Header Parameters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ backgroundColor: '#f5f5dc' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            {headerParameters.map(item => {
                                return item.type !== 'select' ? (
                                    <TextField
                                        style={{ marginBottom: 10, backgroundColor: '#fff', marginTop: 10 }}
                                        key={item.id}
                                        id={item.value}
                                        value={headerParametersForm[item.value] || ''}
                                        label={item.label}
                                        variant="outlined"
                                        placeholder={item.placeholder}
                                        onChange={this.handleChange('header_params')}
                                        fullWidth
                                        disabled
                                    />
                                ) : (
                                    <FormControl
                                        variant="outlined" 
                                        key={item.id}
                                        style={{ marginBottom: 10, backgroundColor: '#fff', marginTop: 10 }}
                                    >
                                        <InputLabel id={item.id}>{item.label}</InputLabel>
                                        <Select
                                            labelId={item.value}
                                            id={item.value}
                                            value={headerParametersForm[item.value] || ''}
                                            onChange={this.handleDropDownChange(item.value)}
                                            variant="outlined"
                                            label={item.label}
                                        >
                                            {item.options && item.options.map(innerItem => (
                                                <MenuItem value={innerItem.label} key={innerItem.id}>{innerItem.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )
                            })}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded style={{ backgroundColor: '#cfb997', fontWeight: 'bold' }}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Optional Parameters</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ backgroundColor: '#f5f5dc' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {optionalParameters.map(item => (
                            <TextField
                                style={{ marginBottom: 10, backgroundColor: '#fff', marginTop: 10 }}
                                key={item.id}
                                id={item.value}
                                label={item.label}
                                variant="outlined"
                                placeholder={item.placeholder}
                                fullWidth
                                value={optionalParametersForm[item.value] || ''}
                                onChange={this.handleChange('optional_params')}
                            />
                        ))}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
            >
                Submit
            </Button>
        </>
        );
    }
}

export default ParameterForm;