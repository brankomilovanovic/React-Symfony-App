import React from 'react';
import Button from '@mui/material/Button';
import {FormProvider} from "react-hook-form";
import strings from '../../../localization';
import TextFieldControl from '../../Inputs/TextFieldControl';
import { getRoleTypes } from '../../../Constants/Role';
import SelectControl from '../../Inputs/SelectControl';
import { getUserTypes } from '../../../Constants/UserType';

const AddUserForm = ({
                      onSubmit,
                      data,
                      form,
                      errors,
                      values,
                      formRules,
                      setValue
                  }) => {

    return (
        <FormProvider {...form}>
            <form id='add-user-form' className='login-form-inputs' action="#">

                <TextFieldControl
                    name='name'
                    rules={formRules['name']}
                    value={values['name']}
                    control={data}
                    error={Boolean(errors.name)}
                    helperText={errors.name && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.name}
                />

                <TextFieldControl
                    name='surname'
                    rules={formRules['surname']}
                    value={values['surname']}
                    control={data}
                    error={Boolean(errors.surname)}
                    helperText={errors.surname && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.surname}
                />

                <TextFieldControl
                    name='email'
                    control={data}
                    rules={formRules['email']}
                    value={values['email']}
                    type={'email'}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    label={strings.base.profile.email}
                />

                <TextFieldControl
                    name='username'
                    rules={formRules['username']}
                    value={values['username']}
                    control={data}
                    error={Boolean(errors.username)}
                    helperText={errors.username && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.username}
                />

                <TextFieldControl
                    name='password'
                    rules={formRules['password']}
                    value={values['password']}
                    control={data}
                    error={Boolean(errors.password)}
                    helperText={errors.password && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.password}
                />

                <SelectControl
                    value={values['role']}
                    rules={formRules['role']}
                    setValue={setValue}
                    name='role'
                    control={data}
                    error={Boolean(errors.role)}
                    helperText={errors.role && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.role}
                    options={getRoleTypes()}
                    nameKey={'name'}
                    valueKey={'id'}
                />

                <SelectControl
                    value={values['userType']}
                    rules={formRules['userType']}
                    setValue={setValue}
                    name='userType'
                    control={data}
                    style={{marginTop: '23px'}}
                    error={Boolean(errors.type)}
                    helperText={errors.type && strings.forms.common.thisFieldIsRequired}
                    label={strings.base.profile.userType}
                    options={getUserTypes()}
                    nameKey={'name'}
                    valueKey={'id'}
                />

                <Button variant="contained" style={{width: '100%'}} onClick={onSubmit}>
                    {strings.forms.common.save}
                </Button>
                
            </form>
        </FormProvider>
    );
}

export default AddUserForm;