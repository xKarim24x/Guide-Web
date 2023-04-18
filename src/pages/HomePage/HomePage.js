import { useEffect, useState } from "react";
import BaseCard from "../../components/BaseCard/BaseCard"
import Carousel from "../../components/Carousel/Carousel";
import Post from "../../components/PostCard/PostCard";
import './HomePage.css'
import Api from "../../api_calls/Api";
import axios from "axios";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import { useLocation } from "react-router-dom";

function HomePage(){

  const [postsGot, setPostsGot] = useState();
  const [postData, setPostData] = useState();

  const [featuresGot, setFeaturesGot] = useState();
  const [featureData, setFeatureData] = useState();

  const [businessDataGot, setBusinessDataGot] = useState();
  const [businessData, setBusinessData] = useState();

  const [CarouselData, setCarouselData] = useState();

  const [initialRun, setInitialRun] = useState(true);

  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (initialRun) {
      setInitialRun(false);
      return;
    }

    async function getPosts() {
      try {
        const Posts = await axios.get(Api.baseURL + "updates");

        if (!postsGot) {
          setPostData(Posts.data);
          setPostsGot(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        //console.log(postData);
      }
    }

    getPosts();
  }, [businessData]);

  useEffect(() => {
    async function getFeatures() {
      try {
        const Features = await axios.get(Api.baseURL + "features");

        if (!featuresGot) {
          setFeatureData(Features.data);
          setFeaturesGot(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        //console.log(featureData);

        setCarouselData(featureData.map(feature => ({image: getDriveImageLink(feature.featuredImageURL)})))
      }
    }

    getFeatures();
  });

  useEffect(() => {
    async function getBusinessData() {
      try {
        const BusinessData = await axios.get(Api.baseURL + "/businesses");

        if (!businessDataGot) {
          setBusinessData(BusinessData.data);
          setBusinessDataGot(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        //console.log(`Business Data:`);
        //console.log(businessData)
      }
    }

    getBusinessData();
  });

  function getDriveImageLink(link) {
    const fileId = link.match(/[-\w]{25,}/); // extract the file ID from the link
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId[0]}`; // return the modified link
    } else {
      return null; // return null if the link is invalid
    }
  }

  return (
    <div className="HomePage">
      <div className="dividerDiv">
        <TopNavBar user={user} />
        {CarouselData && (
          <Carousel
            CarouselData={CarouselData}
            CarouselStyle="FeaturedSlides"
          />
        )}
        {postData &&
          postData.slice(0, 30).map((post) => {
            const business = businessData.find((bus) => {
              return bus.businessId == post.businessID;
            }) 
            if (post.imageURL != null) {
              return (
                <Post
                  profilePic={getDriveImageLink(
                    business.businessProfilePictureURL
                  )}
                  accountName={business.businessName}
                  postImage={getDriveImageLink(post.imageURL)}
                  caption={post.description}
                />
              );
            } else return;
          })}
      </div>
    </div>
  );
}

export default HomePage