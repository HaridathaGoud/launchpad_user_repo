import React, { useEffect,useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import loadimg from '../../assets/images/loader.svg';
import {getDaoCardList} from "../../reducers/rootReducer"
import { Placeholder } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
const reducers =(state,action)=>{
    switch (action.type){
      case 'daoData' :
     return {...state,daoData:action.payload};
  
    }
    }

function DaoCards(props: any) {
    const [state,dispatch]=useReducer(reducers,{daoData:[]})
    const router = useNavigate();
    useEffect(() => {
        window.scrollTo(0,0)
        props.trackDaoCardList((callback :any)=>{
            dispatch({type:'daoData',payload:callback})
        })

    }, [])
    const goToHome=(item : any)=>{
        if(item.name.includes("SEIICHI ")){
            router(`/minting/seiichi/${item?.id}`);
        }else{
            router(`/minting/keiji/${item?.id}`);
        }
    }
    return (
        <><div><div className='container dao-mt'>
            <h5 className='mb-1 back-text'>DAO’s</h5>
            <hr className='custom-hr' />
            <Row>
                {state?.daoData?.loading ?
                    <div className='text-center'>
                        <div className='loading-overlay'>
                            <div className="text-center image-container">
                                <Image
                                    className=""
                                    src={loadimg}
                                    alt=""
                                />
                            </div></div></div>
                    : (<>
                        {state?.daoData?.data?.map((item: any) => (
                            <Col xl={3} xxl={3} lg={4} sm={12} md={6} className='card-rp'>
                                {state?.daoData ? <Card className='dashboard-card me-3 mt-md-0 mt-3 sm-m-0 c-pointer' onClick={() => goToHome(item)}>
                                    <Card.Img variant="top" src={item?.logo} />
                                    <Card.Body>
                                        <Card.Text className='mb-1'>
                                            Name:  {item?.name}
                                        </Card.Text>
                                        <Card.Text className='card-description'>
                                            Members:  {item?.members?.toLocaleString()}
                                        </Card.Text>
                                    </Card.Body>
                                </Card> : (
                                    <div><Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={12} className='cardimg-placeholder' />
                                    </Placeholder>
                                        <Card.Body>
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        </Card.Body>
                                    </div>)}
                            </Col>
                        ))}
                    </>)}
            </Row>
        </div>
        </div></>
    )
}
const connectDispatchToProps = (dispatch: any) => {
    return {
      trackDaoCardList: (callback: any) => {
        dispatch(getDaoCardList(callback));
      },
      dispatch,
    };
  };

  export default connect(null, connectDispatchToProps)(DaoCards);
