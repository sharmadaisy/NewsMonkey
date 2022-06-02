import React from 'react'

const NewsItem =(props)=> {
      let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <div className='d-flex top-0'>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-dark btn-sm">Read More</a>
        </div>
        </div>
      </div>
    )

}

export default NewsItem
