import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Row, Col, message } from 'antd';
import styles from './index.module.less';

const InputItem = (props) => {
    const { name, rules, ...rest } = props;
    const [timing, setTiming] = useState(false);//是否在倒计时
    const [count, setCount] = useState(props.countDown || 60);
    const handleClickCaptcha = () => {
        message.success('Got your captcha: 1234')
        setTiming(true);
    }
    useEffect(() => {
        let interval = 0;
        if (timing) {
            interval = window.setInterval(() => {
                setCount((preSecond) => {
                    if (preSecond <= 1) {
                        setTiming(false);//countdown finished
                        clearInterval(interval);
                        return props.countDown || 60;
                    }
                    return preSecond - 1;
                })
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing, props.countDown])

    if (name === 'captcha') {
        return (
            <Form.Item name={name} rules={rules} >
                <Row gutter={ 8}>
                    <Col span={16}>
                        <Input {...rest} />
                    </Col>
                    <Col span={8}>
                        <Button
                            className={styles.getCaptcha}
                            disabled={ timing}
                            size="large"
                            onClick={ handleClickCaptcha}
                        >
                            { timing ? `${count}seconds` : 'Send Captcha'}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
            )
    }
    return (
        <Form.Item name={name} rules={ rules} >
            <Input {...rest} />
        </Form.Item>
        
    )
};

export default InputItem;