const posts = [
    {
        id: 1,
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        liked: false
    },
    {
        id: 2,
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        liked: false
    },
    {
        id: 3,
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        liked: false
    }
]


function PostHeader({ avatar, name, location }) {
    const thisElm = document.createElement("div")
    thisElm.className = "post-header"

    const avatarLink = document.createElement("a")
    avatarLink.href = "#"
    avatarLink.className = "post-avatar-link"

    const avatarElm = document.createElement("img")
    avatarElm.className = "user-avatar"
    avatarElm.src = avatar
    avatarElm.alt = `Avatar of ${name}`
    avatarLink.append(avatarElm)

    thisElm.append(avatarLink)

    const detailElm = document.createElement("div")
    detailElm.className = "post-header-detail"

    const profileNameElm = document.createElement("a")
    profileNameElm.href = "#"
    profileNameElm.className = "post-profile-name"
    profileNameElm.textContent = name
    detailElm.append(profileNameElm)

    const addressElm = document.createElement("address")
    addressElm.className = "post-location"
    addressElm.textContent = location
    detailElm.append(addressElm)

    thisElm.append(detailElm)
    return thisElm
}

function PostReaction({ likes, id }) {
    const thisElm = document.createElement("div")
    thisElm.className = "post-reaction"

    const buttonWrapper = document.createElement("div")
    buttonWrapper.className = "post-reaction-button"

    const buttons = ["btn-like", "btn-comment", "btn-dm"].map(btn => {
        const buttonElm = document.createElement("button")
        buttonElm.className = btn
        return buttonElm
    })

    buttonWrapper.append(...buttons)
    thisElm.append(buttonWrapper)

    const reactionDetail = document.createElement("div")
    reactionDetail.className = "post-reaction-count"

    const likesElm = document.createElement("a")
    likesElm.href = "#"
    likesElm.className = "likes"

    const likesCountElm = document.createElement("span")
    likesCountElm.className = "likes-count"
    likesCountElm.id = `likes-count-${id}`
    likesCountElm.textContent = likes

    likesElm.append(likesCountElm, " likes")

    thisElm.append(likesElm)

    return thisElm
}

function PostContent({ username, comment }) {
    const thisElm = document.createElement("div")
    thisElm.className = "post-content"

    const usernameElm = document.createElement("a")
    usernameElm.href = "#"
    usernameElm.className = "post-user-name"
    usernameElm.textContent = username

    const contentElm = document.createElement("p")
    contentElm.className = "post-content-text"
    contentElm.append(usernameElm, " ", comment)
    thisElm.append(contentElm)

    return thisElm
}

function triggerLikes(username) {
    console.log(username)
    const dataIndex = posts.findIndex(post => post.username === username)
    const post = posts[dataIndex]
    
    if(post.liked) return false

    post.liked = true
    post.likes += 1
    const likesCountElm = document.getElementById(`likes-count-${post.id}`)
    likesCountElm.textContent = post.likes
}

function sectionCard(data) {
    const cardPost = document.createElement("section")
    cardPost.className = "card-post"

    const postHeader = PostHeader(data)

    const postImg = document.createElement("div")
    postImg.className = "post-img"
    postImg.style.backgroundImage = `url(${data.post})`
    postImg.src = data.post
    postImg.alt = "Post image"
    postImg.addEventListener("dblclick", function () {
        triggerLikes(data.username)
    })

    const postReaction = PostReaction(data)

    const postContent = PostContent(data)

    cardPost.append(
        postHeader,
        postImg,
        postReaction,
        postContent
    )

    return cardPost
}

document.addEventListener("DOMContentLoaded", function () {
    const postsElm = posts.map(post => sectionCard(post))
    const mainContainer = document.querySelector("main > .container")
    mainContainer.append(...postsElm)
})