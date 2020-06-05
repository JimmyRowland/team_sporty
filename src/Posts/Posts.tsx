import React from 'react'
import './PinnedPosts.css'

const SocialPost = <div> Nothing Yet </div>

export default function PinnedPosts(props:{content:string, name:string}){
    const PinnedPost = (content: string, name:string) => <div className="PinnedPost">
        <div className= "Title">PinnedPost</div>
        <div className="Content"> {content}</div>
        <div className="Name"> Posted by {name}</div>
    </div>;

    return PinnedPost(props.content, props.name);
}




