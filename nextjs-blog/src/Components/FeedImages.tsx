import { useState } from "react";
import {useEffect } from "react";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

//import Images from './Images';
import '../css/feed.css';

const Feed: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const [sum, setSum] = useState(50);
    const [images, setImages] = useState([]);
  
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((res) => {
                setSum(res.data?.info?.count);
            })
    }, [])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character'), {
            params: {
                page: current
            }
        }
        .then((res) => {
            setImages(res.data.results);
        })
    }, [current]);
  
    return (
        <div className="feed">
            <h1>Rick and Morty Characters</h1>
            <Images imagesData={images} />
            <Pagination 
                className="pagination"
                responsive
                current={current}
                defaultPageSize={15}
                onChange={onChange} 
                total={sum}
                showSizeChanger={false}
            />
        </div>
    );
  };
  
export default Feed;


  type Image = {
    id: number;
    image: string;
    name: string;
}

type ImagesProps = {
    imagesData: Array<Image>;
};

const Images = ({ imagesData }: ImagesProps) => {
    if(!imagesData || !imagesData.length) {
        return null;
    }

    return (
        <div className="images">
            {imagesData.map((image) => {
                console.log(image);
                return (
                    <div className="character" key={image.id}>
                        <img className="img" src={image.image} alt={image.name} loading="lazy" />
                        <h2 className="name">{image.name}</h2>
                    </div>
                )
            })}
        </div>
    );
}

//export React.memo(Images);