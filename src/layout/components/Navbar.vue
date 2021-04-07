<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="user-avatar">你好</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item >
              <span  @click="Gouserinfo" style="display:block;">个人信息</span>
            </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'


export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data(){
    return {
      drawer:false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       window.localStorage.clear()
       this.$router.push({path:'/login'})
        // await this.$store.dispatch('user/Logout')
      }).catch((error) => {
        console.log(error)
      })
    },
    Gouserinfo(){
      this.$router.push({path:'/userinfo'})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 55px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      margin-left: 20px;
      
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          padding-right: 15px;
          cursor: pointer;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
