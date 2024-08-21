import React, { Component } from 'react'

export class NewsItems extends Component {






    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div>

                <div className="card" style={{ width: "22rem" }}>
                    <div style={{display:'flex',
                    justifyContent:'flex-end',
                    position:'absolute',
                    right:'0'
                
                }}>

                <span className=" badge rounded-pill bg-danger" >{source}</span>

                    </div>

                    <img src={!imageUrl ? "https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2022/09/30/103747-whatsapp-image-2022-07-08-at-114320-am.jpeg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}......</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn  btn-sm btn-primary bg-dark">ReadMore</a>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>

            </div>
        )
    }
}


export default NewsItems
