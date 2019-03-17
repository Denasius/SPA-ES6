import { Component } from '../core/component'
import {apiService} from '../services/api.service'
import {renderPosts} from '../templates/post.template'

export class FavoriteComponent extends Component{
  constructor(id, {loader}){
    super (id)
    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onShow(){
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const html = renderList(favorites)
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide(){
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(event) {
  event.preventDefault()

  if (event.target.classList.contains('js-link')) {
    const postId = event.target.textContent
    this.$el.innerHTML = ''
    this.loader.show()

    const post = await apiService.fetchPostsById(postId)
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', renderPosts(post, {widthButton:false}))
  }
}

function renderList( list = [] ){
  if ( list.length ){
    return `
      <ul>
        ${list.map(item => `<li><a class="js-link" href="#">${item}</a></li>`).join(' ')}
      </ul>
    `
  }

  return `<p class="center">В избранном ничего нету</p>`
}