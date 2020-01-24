<template>
  <div class="home">
    <!-- <tree-view :data="posts" :options="{maxDepth: 3}"></tree-view> -->
    <!-- <pre>{{posts}}</pre> -->
    <h1 class="text-4xl">Reddit Shop 76</h1>
    <!-- {{dateNow}} to -->
    <!-- {{cutOffDate}} -->
    <!-- {{endpoint}} -->
    <div class="flex flex-row">
      <input v-model="search" class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" placeholder="Search and hit enter" v-on:keyup.enter="sendData()" />
      <button class="btn btn-green ml-2" @click="sendData()">Search</button>
    </div>
    <div id="platform-chooser" class="py-4">
    <button id="xb1" class="btn btn-green" @click="platform = 'XB1'">XB1</button> <button id="ps4" class="btn btn-blue" @click="platform = 'PS4'">PS4</button> <button id="pc" class="btn btn-gray" @click="platform = 'PC'">PC</button>
    </div>
    <div id="posts">
      <h2 class="text-xl">{{platform}} Posts:</h2>
      <div class="bg-gray-100 my-2 p-2 flex flex-row content-center" v-for="post in posts" :key="post.id">
        <div class="bg-gray-500">
          <img v-if="post.thumbnail.includes('.jpg')" :src="post.thumbnail" width="60">
        </div>
        <div class="flex flex-col self-center px-2">
          <h5><a class="font-bold text-blue-500" :href="'//reddit.com' + post.permalink" target="_blank">{{post.title}}</a></h5>
          <!-- <p v-html="post.selftext"></p> -->
          <p><small>on <a class="font-bold" :href="'//reddit.com/r' + post.subreddit" target="_blank">{{post.subreddit}}</a> at {{post.created_utc | moment("MMM D, h:mma")}} | <a class="font-bold text-blue-500" :href="'//reddit.com' + post.permalink" target="_blank">{{post.num_comments}} Comments</a></small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import moment from 'moment'
// import Vue2Filters from 'vue2-filters'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  // mixins: [Vue2Filters.mixin],
  data () {
    return {
      market76: null,
      fo76marketplace: null,
      fo76FilthyFleaMarket: null,
      posts: [],
      search: '',
      platform: 'XB1'
    }
  },
  watch: {
    platform () {
      this.sendData()
    },
    search () {
      // this.sendData()
    }
  },
  computed: {
    dateNow: function () {
      let d = moment().format('X')
      return d
    },
    cutOffDate: function () {
      let d = moment().subtract(4, 'days').format('X')
      // d.setDate(d.getDate() - 2)
      // let df = moment(d, 'x').subtract(1, 'days')
      return d
    },
    endpoint: function () {
      let link = decodeURI('https://api.pushshift.io/reddit/submission/search/?sort=desc&subreddit=fo76marketplace,Market76,fo76FilthyFleaMarket&title=' + this.platform + '+' + this.search + '&sort_type=created_utc&limit=1000&after=' + this.cutOffDate)
      console.log(link)
      return link
    },
    fo76marketplaceEndpoint: function () {
      return 'https://www.reddit.com/r/fo76marketplace/search.json?q=flair%3AXB1&restrict_sr=on&sort=new&t=all&limit=100'
    },
    fo76FilthyFleaMarketEndpoint: function () {
      return 'https://www.reddit.com/r/fo76FilthyFleaMarket/search.json?q=flair%3AXB1&restrict_sr=1&sort=new&t=all&limit=100'
    // },
    // posts: function () {
    //   let newArr
    //   return newArr.concat(this.market76, this.fo76marketplace, this.fo76FilthyFleaMarket)
    // },
    // sortedPosts: function () {
    //   let sorted = this.posts.slice().sort((a, b) => b.created - a.created)
    //   return sorted
    },
    filteredList () {
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    sendData () {
      // axios.all([this.getMarket76(), this.getFo76marketplace(), this.getFo76FilthyFleaMarket()])
      axios.all([this.getMarket76()])
      // console.log('Clicked')
    },
    // getMarket76 () {
    //   axios.get(this.market76Endpoint)
    //     .then(response => (
    //       response.data.data.children.forEach((item) => {
    //         this.posts.push(item)
    //       })
    //     ))
    // },
    getMarket76 () {
      axios.get(this.endpoint)
        .then(response => (this.posts = response.data.data))
    },
    getFo76marketplace () {
      axios.get(this.fo76marketplaceEndpoint)
        .then(response => (
          response.data.data.children.forEach((item) => {
            this.posts.push(item)
          })
        ))
    },
    getFo76FilthyFleaMarket () {
      axios.get(this.fo76FilthyFleaMarketEndpoint)
        .then(response => (
          response.data.data.children.forEach((item) => {
            this.posts.push(item)
          })
        ))
    }
    // getMarket76 () {
    //   axios.get(this.market76Endpoint)
    //     .then(response => (this.market76 = response.data.data.children))
    // },
    // getFo76marketplace () {
    //   axios.get(this.fo76marketplaceEndpoint)
    //     .then(response => (this.fo76marketplace = response.data.data.children))
    // },
    // getFo76FilthyFleaMarket () {
    //   axios.get(this.fo76FilthyFleaMarketEndpoint)
    //     .then(response => (this.fo76FilthyFleaMarket = response.data.data.children))
    // }
  },
  mounted () {
    this.sendData()
  }
}
</script>

<style lang="postcss">
a {
  @apply text-blue-500
}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.btn-green {
  @apply bg-green-500 text-white;
}
.btn-green:hover {
  @apply bg-green-700;
}
.btn-gray {
  @apply bg-gray-500 text-white;
}
.btn-gray:hover {
  @apply bg-gray-700;
}
</style>
