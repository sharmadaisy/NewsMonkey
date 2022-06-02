import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
// import NewsDetail from "./NewsDetail";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect( () => {
    document.title = `NewsMonkey | ${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    }`;
    updateNews();
  },[]);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
    // console.log(articles.length+ "  "+totalArticles);
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop: '100px'}}>
          NewsMonkey - Top Headlines |{" "}
          {props.category.charAt(0).toUpperCase() +
            props.category.slice(1)}
        </h1>
        {loading && <Spinner/>}      
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 4,
  category: "general",
};

export default News;
