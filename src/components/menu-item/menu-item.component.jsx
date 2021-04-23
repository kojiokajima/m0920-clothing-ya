import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import './menu-item.styles.scss';
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from './menu-item.styles'

class MenuItem extends Component {
  render() {
    const { title, imageUrl, size, history, linkUrl, match } = this.props
    console.log("match.url is ", match.url);
    console.log("linkUrl is ", linkUrl);
    return (
      <MenuItemContainer 
        size={size} 
        id={title} 
        onClick={() => history.push(`${match.url}${linkUrl}`)}
        // onClick={() => console.log("HOHHOHHO")}
      >
        <BackgroundImageContainer
          className='background-image'
          imageUrl={imageUrl}
        />
        <ContentContainer className='content'>
          <ContentTitle>{title.toUpperCase()}</ContentTitle>
          <ContentSubtitle>SHOP NOW</ContentSubtitle>
        </ContentContainer>
      </MenuItemContainer>
      // <div className={`${size} menu-item ${className}`}>
      //   <div
      //     className='background-image'
      //     style={{
      //       backgroundImage: `url(${imageUrl})`
      //     }}
      //   />
      //   <div className='content'>
      //     <h1 className='title'>{title.toUpperCase()}</h1>
      //     <span className='subtitle'>SHOP NOW</span>
      //   </div>
      // </div>
    )
  }
}

export default withRouter(MenuItem)
