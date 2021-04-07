<script>
export default {
  created(){
    let { path,params } = this.$route
    this.$router.push({path:`/${params.path}`})
  },
  render(h) {
    return h()
  },
}
</script>