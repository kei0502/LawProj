import React from 'react';
import {Row, Col, Carousel, Icon} from 'antd';
import Header from '../header';
import Footer from '../../layouts/footer';
const View = React.createClass({
    render(){
        return (<div>
            <Header user={this.props.user}/>
            <Row><Col span={16} offset={4}>
                <Carousel autoplay>
                    {this.props.ads.map((ad, i)=>(<div key={ad._id}>
                        <img src={ad.pic} alt={"广告图片"+i} width="100%" height="400"/>
                    </div>))}
                </Carousel>
            </Col></Row>
            <Footer/>
        </div>);
    }
});
export default View;