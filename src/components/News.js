import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "General",
    

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    
    }


    

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

   


    constructor(props) {
        super(props);
        console.log("hello i am a constructor")
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,


        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} | NewsMonkey App`;
    }


    async updateNews() {
        try {
            
            this.props.setProgress(10)
            
            const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
            this.setState({ loading: true })
            const data = await res.json();
            
            this.props.setProgress(50)
            console.log(data)
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false
                
                
                
            });
        this.props.setProgress(100)


        }
        catch (e) {
            console.log("something is not working")

        }


    }

    async componentDidMount() {
        // console.log("cdm")
        // let url = "https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=eb40a722956943f39b3bbb6d0206f032"
        // let data = await fetch(url);
        // let parsedData  = await data.json();
        // console.log(parsedData)
        // this.setState({articles: parsedData.arcticles})
        // fetch("https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=eb40a722956943f39b3bbb6d0206f032").then((res)=>res.json())
        // .then((json)=>{
        //     this.setState({articles: json.arcticles,

        //         loading :false
        //     })
        // })



        this.updateNews();


    }

    handleNextBtn = async () => {
        console.log("next")

        // if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.page) )){   

        //     try {
        //             this.setState({loading : true})
        //             const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=eb40a722956943f39b3bbb6d0206f032&page=${this.state.page+1}&pageSize=${this.props.pageSize}`)
        //             const data = await res.json();
        //             console.log(data)
        //             this.setState({
        //                 page: this.state.page + 1,
        //                 articles: data.articles,
        //                 loading :false
        //             })


        //         }
        //         catch (e) {
        //             console.log("something is not working")

        //         }



        //     }



        this.setState({
            page: this.state.page + 1
        })

        this.updateNews();

    }

    handlePrevBtn = async () => {
        console.log("prev")
        // try {
        //     this.setState({loading : true})
        //     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=eb40a722956943f39b3bbb6d0206f032&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
        //     const data = await res.json();
        //     console.log(data)
        //     this.setState({
        //         page: this.state.page - 1,
        //         articles: data.articles,
        //         loading:false
        //     })


        // }
        // catch (e) {
        //     console.log("something is not working")

        // }
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();

    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })

        try {


            const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
            const data = await res.json();
            console.log(data)
            this.setState({

                articles: this.state.articles.concat(data.articles),
                totalResults: data.totalResults,



            });


            


        }
        catch (e) {
            console.log("something is not working")

        }





    };






    render() {
        // console.log("render")
        return (
            <>


                <h1 className="text-center my-4 mx-2">
                    Top News Headlines | {this.capitalizeFirstLetter(this.props.category)}</h1>

                {this.state.loading && <Spinner />}



                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">

                        <div className="row">

                            {this.state.articles.map((element) => {
                                // {!this.state.loading && this.state.articles.map((element) => {

                                return <div className="col-md-4 my-4" key={element.url}>
                                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                        source={element.source.name} />

                                </div>


                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">

                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevBtn}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>

                </div> */}



            </>
        )
    }
}

export default News