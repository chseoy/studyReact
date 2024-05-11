import React, { useState } from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'
import {app} from '../../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navi = useNavigate();

    const auth = getAuth(app); // 파이어베이스 인증 서비스 가져옴

    const [form, setForm] = useState({
        email: 'blue@test.com',
        pass: '12341234'
    });

    const [loading, setLoading] = useState(false);

    const {email, pass} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e)  => {
        e.preventDefault();
        if(email === "" || pass === "") {
            alert("이메일과 비밀번호를 입력하세요.")
        }else{
            // 로그인 체크
            setLoading(true)
            signInWithEmailAndPassword(auth, email, pass)
            .then(success=>{
                alert("로그인 성공!");
                setLoading(false);
                sessionStorage.setItem('email', email); // 전체 페이지에서 다 사용할 수 있는 공간에 이 이메일을 넣음
                sessionStorage.setItem('uid', success.user.uid)

                if(sessionStorage.getItem('target')) {
                    navi(sessionStorage.getItem('target'));
                }else{
                    navi('/'); // 홈으로 이동
                }
            })
            .catch(error=> {
                alert("에러 : " + error.message);
                setLoading(false);
            });
        }
    }

    if(loading) return <h1 className='my-5'>로딩중입니다...</h1>

  return (
    <Row className='my-5 justify-content-center'>
        <Col md={6}>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>로그인</h3>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text style={{width:100}} className='justify-content-center'>이메일</InputGroup.Text>
                            <Form.Control name='email' value={email} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text style={{width:100}} className='justify-content-center'>비밀번호</InputGroup.Text>
                            <Form.Control name='pass' type='password' value={pass} onChange={onChange}/>
                        </InputGroup>
                        <div>
                            <Button className='w-100' type='submit'>로그인</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default Login