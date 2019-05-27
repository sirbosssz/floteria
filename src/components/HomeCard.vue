<template>
  <router-link :to="content.link" class="home-card">
    <div class="home-card-content">
      <img :src="image" alt="mode image">
      <div class="text">
        <h1>{{content.title}}</h1>
        <p>{{content.description}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    content: Object
  },
  data() {
    return {
      image:
        "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE25wJP?ver=cd46&q=90&m=8&h=214&w=380&b=%23FFFFFFFF&l=f&x=0&y=0&s=740&d=417"
    };
  },
  mounted() {
    if (this.$props.content.iconURL.length > 0) {
      this.image = this.$props.content.iconURL;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/colors.scss";

.home-card-content {
  background: #ededed;
  text-align: left;
  padding: 1em;
  img {
    object-fit: cover;
    height: 280px;
    width: 100%;
    border-radius: 8px;
    transition: filter 0.5s ease;
  }
  img:hover {
    filter: brightness(0.9);
  }
}
.text {
  padding: 0 1em 0 1em;
  h1 {
    font-size: 18pt;
    font-weight: bold;
    color: $orange;
    transition: color 0.5s ease;
  }
  h1:hover {
    color: $orange-light;
  }
  p {
    font-size: 14pt;
    color: #121212;
  }
}

@media (min-width: 769px) {
  .home-card-content {
    img {
      object-fit: cover;
      height: 35vh;
      max-height: 300px;
    }
  }
}
</style>
