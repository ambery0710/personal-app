import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputItem from '../../components/inputItem';
import styles from './index.module.less';
import { Form, Popover, Progress, Row, Col, Select } from 'antd';
import SubmitButton from '../../components/submitButton';

const { Option } = Select;

const passwordStatuesMap = {
	ok: (
		<div className={styles.success}>
			Strong
		</div>
	),
	pass: (
		<div className={styles.warning}>
			Medium
		</div>
	),
	poor: (
		<div className={styles.error}>
			Weak
		</div>
	),
}

const passwordProgressMap = {
	ok: 'success',
	pass: 'normal',
	poor: 'exception',
}

const Register = () => {
	const [form] = Form.useForm();

	const handleFinish = (values) => {
		console.log(values);
	}

	const [visible, setVisible] = useState(false);
	const [popover, setPopover] = useState(false);//让state发生改变使progress实时渲染
	const [prefix, setPrefix] = useState('86');

	const checkConfirm = (_, value) => {
		const promise = Promise;
		if (value && value !== form.getFieldValue('password')) {
			return promise.reject('Wrong password');
		}
		return promise.resolve();
	}

	const getPasswordStatus = () => {
		const value = form.getFieldValue('password');
		if (value && value.length > 9) {
			return 'ok';
		}
		if (value && value.length > 6) {
			return 'pass';
		}
		return 'poor';
	}

	const checkPassword = (_, value) => {
		const promise = Promise;
		if (!value) {
			setVisible(!!value);
			return promise.reject('please input password');
		}
		if (!visible) {
			setVisible(!!value);
		}
		setPopover(!popover);
		if (value && form.getFieldValue('confirm')) {
			form.validateFields(['confirm']);
		}
		return promise.resolve();
	}

	const rederPasswordProgress = () => {
		const value = form.getFieldValue('password');
		const passwordStatus = getPasswordStatus();
		return value && value.length && (
			<div className={styles[`progress-${passwordStatus}`]}>
				<Progress
					className={styles.progress}
					status={passwordProgressMap[passwordStatus]}
					strokeWidth={6}
					percent={value.length * 10 > 100 ? 100 : value.length * 10}
					showInfo={false}
				/>
			</div>
			)

	}

	return (
		<div className={styles.registerContainer}>
			<div className={styles.register}>
				<Form
					form={form}
					onFinish={handleFinish}
				>
					<InputItem
						name="mail"
						placeholder="Email"
						size="large"
						rules={[
							{
								required: true,
								message: 'please input Email Address'
							},
							{
								type: 'email',
								message: 'please input a valid Email Address'
							},
						]}
					/>

					<Popover
						content={
							visible && (
								<div>
									{passwordStatuesMap[getPasswordStatus()]}
									{rederPasswordProgress()}
									<div>
										Some password rules
									</div>
								</div>
							)
						}
						overlayStyle={{width: 240}}
						placement="right"
						visible={visible}
					>
						<InputItem
							name="password"
							placeholder="enter at least 6 digits or letters"
							size="large"
							type="password"
							rules={[
								{
									required: true,
									message: 'please input password'
								},
								{
									validator: checkPassword,
								},
							]}
						/>
					</Popover>
					
					<InputItem
						name="confirm"
						placeholder="input your password again and confirm"
						size="large"
						type="password"
						rules={[
							{
								required: true,
								message: 'please input password again'
							},
							{
								validator: checkConfirm,
							},
						]}
					/>
					<Row>
						<Col span={6}>
							<Select
								size="large"
								value={prefix}
								onChange={(value) => setPrefix(value)}
								style={{ width: 100 }}
							>
								<Option value="86">+86</Option>
								<Option value="1">+1</Option>
							</Select>

						</Col>
						<Col span={18}>
							<InputItem
								name="mobile"
								placeholder="Phone number"
								size="large"
								rules={[
									{
										required: true,
										message: 'please input your phone number'
									},
									{
										pattern: /^\d{11}$/,
										message: 'unvalid phone number'
									},
								]}
							/>
						</Col>
					</Row>
					<InputItem
						name="captcha"
						placeholder="Captcha"
						size="large"
						type="password"
						rules={[
							{
								required: true,
								message: 'please input captcha'
							}
						]}
					/>

					<Row justify="space-between" align="middle">
						<Col span={8}>
							<SubmitButton>Register</SubmitButton>
						</Col>
						<Col span={16}>
							<Link className={styles.login} to="/login">
								Ruturn to Login
							</Link>
						</Col>
					</Row>
					
				</Form>
			</div>
		</div>
	)
};
export default Register;