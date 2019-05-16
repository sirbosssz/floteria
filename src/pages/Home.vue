<template>
  <div class="home">
    <Navbar page="home"/>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="home-title">เรียนรู้...ทักษะการเขียนโปรแกรม</h1>
          <h2
            class="home-subtitle"
          >Floteria เป็นเว็บไซต์ที่สำหรับการเรียนเขียนโปรแกรมเบื้องต้นโดยใช้สัญลักษณ์ flowchart ในการเขียนโปรแกรมพื้นฐาน และมีบทเรียนพร้อมกับมินิเกมฝึกทักษะที่เข้าใจง่าย</h2>
        </div>
      </div>
    </section>
    <section class="features">
      <div class="columns" id="columns">
        <!-- if have more than 2 column: delete is-offset-2 -->
        <div class="column is-one-third is-offset-2">
          <HomeCard :content="cardData.lab"/>
        </div>
        <div class="column is-one-third">
          <HomeCard :content="cardData.lessons"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import HomeCard from "@/components/HomeCard.vue";

export default {
  name: "HomePage",
  components: {
    Navbar,
    HomeCard
  },
  data() {
    return {
      cardData: {
        lab: {
          title: "แลปทดลอง",
          description: "ห้องสำหรับทดลองเขียนโปรแกรมอย่างอิสระจากคำสั่งพื้นฐาน",
          iconURL: "",
          link: "/lab"
        },
        lessons: {
          title: "บทเรียนเบื้องต้น",
          description: "ฝึกเขียนโปรแกรมขั้นพื้นฐานจากบทเรียนและมินิเกมในร้านเบเกอรี่",
          iconURL: "",
          link: "/lessons"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.home {
  color: #121212;
  .hero {
    background: #fff;
  }
}
.home-title {
  font-size: 20pt;
  font-weight: bold;
  text-align: center;
}
.home-subtitle {
  font-size: 12pt;
  text-align: center;
}
.features {
  margin-top: 1rem;
}
#columns {
  margin-right: 0;
  margin-left: 0;
}

@media (min-width: 450px) {
  .home-title {
    font-size: 26pt;
  }
  .home-subtitle {
    max-width: 65vw;
    margin: auto;
  }
  #columns {
    margin-right: 0.75em;
    margin-left: 0.75em;
  }
}

@media (min-width: 768px) {
  .hero {
    padding: 1em 0 1em 0;
  }
  .home-title {
    font-size: 30pt;
  }
  .home-subtitle {
    font-size: 14pt;
    // padding: 0 5em 0 5em;
    max-width: 50vw;
  }
  .features {
    margin-top: -2.8em;
  }
}
</style>
