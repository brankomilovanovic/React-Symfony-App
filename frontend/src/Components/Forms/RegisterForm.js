import React from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../localization';
import TextFieldControl from '../Inputs/TextFieldControl';

const RegisterForm = ({
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
                    name='name'
                    rules={formRules['name']}
                    control={data}
                    error={Boolean(errors.name)}
                    helperText={errors.name && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.name}
                />

                <TextFieldControl
                    name='surname'
                    rules={formRules['surname']}
                    control={data}
                    error={Boolean(errors.surname)}
                    helperText={errors.surname && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.surname}
                />

                <TextFieldControl
                    name='email'
                    control={data}
                    rules={formRules['email']}
                    type={'email'}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    label={strings.base.profile.email}
                />

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
                    rules={formRules['password']}
                    control={data}
                    error={Boolean(errors.password)}
                    helperText={errors.password && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.password}
                />

                <Button variant="contained" style={{width: '100%'}} onClick={onSubmit}>
                    {strings.forms.common.register}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default RegisterForm;