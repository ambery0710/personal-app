import { Tabs, Form, Checkbox, Row } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone, GoogleOutlined, FacebookOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InputItem from '../../components/inputItem';
import SubmitButton from '../../components/submitButton';
import styles from './index.module.less';

const { TabPane } = Tabs;

const Login = () => {
	const [autoLogin, setAutoLogin] = useState(true);
	const [form] = Form.useForm();

	const handleFinish = (values) => {
		console.log(values);
	}

	return (
		<div className={styles.loginContainer}>
			<div className={styles.login}>
				<Form
					form={form}
					onFinish={ handleFinish}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="use your account" key="1">
							<InputItem
								name="username"
								prefix={
									<UserOutlined style={{ color: '#1890ff' }} />
								}
								placeholder="Account Name"
								size="large"
								rules={[
									{
										required: true,
										message: 'please input account name'
									}
								]}
							/>
							<InputItem
								name="password"
								prefix={
									<LockTwoTone />
								}
								placeholder="Password"
								size="large"
								type="password"
								rules={[
									{
										required: true,
										message: 'please input password'
									}
								]}
							/>
						</TabPane>
						<TabPane tab="use your phone" key="2">
							<InputItem
								name="mobile"
								prefix={
									<MobileTwoTone />
								}
								placeholder="Phone number"
								size="large"
								rules={[
									{
										required: true,
										message: 'please input Phone number'
									}
								]}
							/>
							<InputItem
								name="captcha"
								prefix={
									<MailTwoTone />
								}
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
						</TabPane>
					</Tabs>
					<Row justify="space-between">
						<Checkbox
							checked={autoLogin}
							onChange={(e) => setAutoLogin(e.target.checked)}
						>AutoLogin</Checkbox>
						<a href="#!"> Forget Password</a>
					</Row>
					<SubmitButton>Login</SubmitButton>
				</Form>

				<div className={styles.other}>
					Other Login Path
					<WeiboCircleOutlined className={ styles.icon}/>
					<FacebookOutlined className={styles.icon} />
					<GoogleOutlined className={styles.icon} />
					<Link className={styles.register} to="/register">
						Register
					</Link>
				</div>
			</div>
		</div>
	)
};
export default Login;