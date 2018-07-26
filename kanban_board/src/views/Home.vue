<template>
<div class="header">
  <nav>
    <div class="nav-wrapper">
      <a class="brand-logo center">Kanban Wanna Be</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down"></ul>
    </div>
  </nav>
  <div class="columns">
    <div class="row">
      <Card :data="backlog" name="backlog" @remove="remove" @test="test"/>
      <Card :data="todo" name="todo" @remove="remove" @test="test"/>
      <Card :data="doing" name="doing" @remove="remove" @test="test"/>
      <Card :data="done" name="done" @remove="remove" @test="test"/>
    </div>
  </div>
  <!-- Modal Trigger -->
 <a class="waves-effect waves-light btn modal-trigger" @click="menu">Click Me</a>
 <!-- Modal Structure -->
 <div id="modal1" class="modal">
   <div class="modal-content Light-pink">
     <p>Title :</p>
     <input type="text" v-model='new_title'>
     <p>Assigned to :</p>
     <input type="text" v-model='new_assign'>
     <p>Point :</p>
     <input type="text" v-model='new_point'>
   </div>
   <div class="modal-footer">
     <a href="#" class="modal-action modal-close waves-effect waves-Pink btn-flat" @click='submit()'>Add New Kanban</a>
   </div>
 </div>

  <footer>
    <div class="footer">
      <div class="container">
        Olla's Kanban App
      </div>
    </div>
  </footer>
</div>
</template>
<script>
// @ is an alias to /src
import Card from "../components/Card.vue"
import {
  kanban,
  db
} from "../firebase"
export default {
  data: () => ({
    backlog: [],
    todo: [],
    doing: [],
    done: [],
    bottomPosition: 'md-bottom-right',
    modal1: false,
    name: '',
    new_title: "",
    new_assign: "",
    new_point: ""
  }),
  components:{
    Card: Card
  },
  created() {
    let self = this
    kanban.on('value', function(snapshot) {
      self.backlog = []
      self.todo = []
      self.doing = []
      self.done = []
      Object.entries(snapshot.val()).map(e => {
        var value = Object.assign({}, {
          id: e[0]
        }, e[1])
        if (value.status == 'backlog') {
          self.backlog.push(value)
        } else if (value.status == 'todo') {
          self.todo.push(value)
        } else if (value.status == 'doing') {
          self.doing.push(value)
        } else if (value.status == 'done'){
          self.done.push(value)
        }
      })
    });
  },
  methods: {
    remove(id){
      kanban.child(id).set(null)
    },
    menu () {
      $('#modal1').openModal()
    },
    submit() {
      kanban.push({
        title: this.new_title,
        assign: this.new_assign,
        point: this.new_point,
        status: 'backlog'
      })
      this.clearNew()
    },
    test: function(item, to) {
      kanban.child(item.id).set({
        title: item.title,
        point: item.point,
        assign: item.assign,
        status: to
      })
    },
    clearNew(){
      this.new_title  = ""
      this.new_assign = ""
      this.new_point  = ""
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
    margin: 10px;
}

.md-dialog {
    max-width: 768px;
}
</style>
