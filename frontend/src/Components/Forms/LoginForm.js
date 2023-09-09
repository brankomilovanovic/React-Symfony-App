import React from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../localization';
import TextFieldControl from '../Inputs/TextFieldControl';

const LoginForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      formRules
                  }) => {

    return (
        <FormProvider {...form}>
            <form id='login-form' className='login-form-inputs' action="#">

                <TextFieldControl
                    name='username'
                    rules={formRules['username']}
                    control={data}
                    error={Boolean(errors.username)}
                    helperText={errors.username && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.username}
                />

                <TextFieldControl
                    name='password'
                    type='password'
                    rules={formRules['password']}
                    control={data}
                    error={Boolean(errors.password)}
                    helperText={errors.password && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.password}
                />

                <Button variant="contained" style={{width: '100%'}} onClick={onSubmit}>
                    {strings.forms.common.login}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default LoginForm;