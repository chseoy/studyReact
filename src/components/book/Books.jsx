import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, InputGroup, Row, Form, Button, Card } from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import {app} from '../../firebaseInit'
import {getDatabase, ref, get, set} from 'firebase/database'

const Books = () => {
    const db = getDatabase(app); // db 가져오는 작업
    const navi = useNavigate();
    const uid = sessionStorage.getItem('uid');
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('리액트');
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [end, setEnd] = useState(false);

    const callAPI = async() => {
        setLoading(true);
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config = {
            headers:{
                "Authorization" : "KakaoAK 3b06b87b5ecf6eb05c3de92d42cad9e8"
            }
        };
        const res = await axios.get(url, config);
        console.log(res.data);
        setBooks(res.data.documents);
        setEnd(res.data.meta.is_end);

        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    }

    const onClickCart = (book) => {
        if(uid) {
            // 장바구니에 도서 넣기
            if(window.confirm(`[${book.title}]\n해당 도서를 장바구니에 넣으시겠습니까?`)) {
                // 장바구니 중복 체크
                get(ref(db, `cart/${uid}/${book.isbn}`)).then(snapshot=>{
                    if(snapshot.exists()) {
                        alert("이미 장바구니에 담았습니다!");
                    }else{
                        set(ref(db, `cart/${uid}/${book.isbn}`), {...book});
                        alert("장바구니에 도서를 담았습니다.");
                    }
                });
            }
        }else {
            sessionStorage.setItem('target', '/books');
            navi('/login')
        }
    }

    if(loading) return <h1 className='my-5'>로딩 중..</h1>

  return (
    <div className='my-5'>
        <h1 className='my-5'>도서검색</h1>
        <Row className='mb-2'>
          <Col xs={8} md={6} lg={4}>
            <form onSubmit={onSubmit}>
                <InputGroup>
                  <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='검색어' value={query}/>
                  <Button variant="light" type='submit'>검색</Button>
                </InputGroup>
            </form>
          </Col>
        </Row>
        <Row>
          {books.map(book =>
              <Col key={book.isbn} xs={6} md={3} lg={2} className='mb-2'>
                <Card>
                    <Card.Body className='justify-content-center d-flex'>
                        <img src={book.thumbnail || 'http://via.placeholder.com/120x170'}/>
                    </Card.Body>
                    <Card.Footer>
                        <div className='ellipsis'>{book.title}</div>
                        <FaShoppingCart onClick={()=>onClickCart(book)} style={{cursor:'pointer', fontSize:'20px', color:'green'}}/>
                    </Card.Footer>
                </Card>
              </Col>
          )}
        </Row>
        <div className='text-center my-3'>
          <Button variant="light" onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
          <span className='mx-2'>{page}</span>
          <Button variant="light" onClick={()=>setPage(page+1)} disabled={end}>다음</Button>
        </div>
    </div>
  )
}

export default Books