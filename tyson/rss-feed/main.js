const app = new Vue({
    el: '#myvue',
    data: {
        message:"You Feedz",
        rssItems: [],
        feeds:[],
        showAdd: false,
        addFeedUrl: '',
        feedFilter: 'All'
    },
    computed: {
        filteredFeed() {
            if (this.feedFilter == 'All') {
                return this.rssItems;
            }
            return this.rssItems.filter(x => x.feed == this.feedFilter);
        }
    },
    filters: {
    },
    methods: {
        AddFeed() {
            var feedJsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + this.addFeedUrl;
            fetch(feedJsonUrl)
                .then(response => response.json())
                .then(data => {
                    this.rssItems.push(...data.items.map(x => {
                        return {
                            link: x.link,
                            title: x.title,
                            feed: data.feed.title
                        }
                    }));
                    this.feeds.push(data);
                    this.addFeedUrl = ''
                    this.showAdd = false
                });
        }
    },
    created() {
    },
    mounted() {
    }
})