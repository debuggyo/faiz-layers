Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "555, Standing by, Complete",
                "913, Standing by, Complete",
                "Henshin, Standing by, Complete",
                "Henshin.",
                "five hundred and fifty five",
                "Faiz Reference?!",
                "*blows on food*",
                "*becomes orphnoch*",
                "Call 913666 to hate on Kusaka!",
                "*disintegrates*",
                "Saa, jikken o haji- wait... wrong season",
                "Saa, omae no tsu- wait... wrong season",
                "Saa, kokokara- wait... wrong season",
                "You can either drop Dark Treats- wait... wrong season",
                "The people with no name - RIDER CHIPS",
                "Justiφ's - ISSA",
                "Kanashimi wo kurikaeshi, Boku-ra wa doko e yuku no darou?",
                "*that creepy kusaka smile*"
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length;
        }
    },
    methods: {
        getMessage: function()
        {
            const arr = Array.from(this.messages);
            if(this.messageIndex !== -1)
            {
                arr.splice(this.messageIndex, 1);
            }
            const index = Math.floor(Math.random() * arr.length);
            this.messageIndex = index;
            const element = arr[index];
            this.currentMessage = typeof element === "string" ? element : element();
        }
    },
    mounted: function()
    {
        this.getMessage();
        this.$refs.message.onanimationiteration = e =>
        {
            const anim = this.$refs.message.style.animation.slice();
            this.getMessage();
            this.$refs.message.style.animation = "none";
            void this.$refs.message.offsetWidth; //very black magic
            this.$refs.message.style.animation = anim;
            Vue.nextTick(() =>
            {
                if(this.$refs.message.style.animationDuration === "")
                {
                    this.$refs.message.style.animationDuration = this.animationDuration + "s";
                }
            });
        };
    },
    template: `<div class="news-ticker">
    <span ref="message" :style="{'animation-duration': animationDuration + 's'}" v-html="currentMessage"></span>
</div>`
})
