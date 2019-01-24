<template>
  <div id="sidebar">
    <div
      id="wrapper"
      :class="{toggled: isToggle}"
    >
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand">
            <a href="/">管理者頁面</a>
          </li>
          <li><a href="charts">圖表系統</a></li>
        </ul>
      </div>
      <!-- /#sidebar-wrapper -->
      <div class="side-control">
        <div class="side-cicle"></div>
        <a
          href="#"
          class="side-toggle"
          @click="ToggleSidebar"
        ><i :class="['fas', isToggle ? 'fa-chevron-left' : 'fa-chevron-right']"></i></a>
      </div>
      <!-- <a href="#" id="toggle" @click="ToggleSidebar">Toggle Menu</a> -->
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      isToggle: false
    };
  },
  methods: {
    ToggleSidebar(event) {
      event.preventDefault();
      this.isToggle = !this.isToggle;
    }
  }
};
</script>

<style lang="scss">
.side-control {
  display: inline-block;
  float: left;
  width: 25px;
  height: 100vh;
  position: relative;
  z-index: 1000;
  overflow: hidden;
  .side-cicle {
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    background-color: #cdd5e0;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .side-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    color: #4e709d;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  &.toggled {
    padding-left: 250px;
    #sidebar-wrapper {
      width: 250px;
      z-index: 3;
    }
    #page-content-wrapper {
      position: absolute;
      margin-right: -250px;
    }
  }
}

#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 250px;
  width: 0;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  background: #000;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#page-content-wrapper {
  width: 100%;
  position: absolute;
  padding: 15px;
}

.sidebar-nav {
  position: absolute;
  top: 0;
  width: 250px;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    text-indent: 20px;
    line-height: 40px;
  }
  a {
    display: block;
    text-decoration: none;
    color: #999999;
    &:hover {
      text-decoration: none;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
    }
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
}
.sidebar-nav > .sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
  a {
    color: #999999;
    &:hover {
      color: #fff;
      background: none;
    }
  }
}

@media (min-width: 768px) {
  #wrapper {
    padding-left: 0;
    &.toggled {
      padding-left: 250px;
      #sidebar-wrapper {
        width: 250px;
      }
      #page-content-wrapper {
        position: relative;
        margin-right: 0;
      }
    }
  }
  #sidebar-wrapper {
    width: 0;
  }
  #page-content-wrapper {
    padding: 20px;
    position: relative;
  }
}
</style>
