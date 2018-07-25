<template>
<div class="header">
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo center">Kanban Wanna Be</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down"></ul>
    </div>
  </nav>
  <div class="columns">
    <div class="row">
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-panel red">
            BACKLOG
          </div>
          <div class="card" id="card" v-for="(item, id) in backlog">
            <div class="card-panel light">
              {{item.title}}
            </div>
            <div class="card-content">
              <p>Point: {{item.point}}</p>
              <p>In Charge: {{item.assign}}</p>
            </div>
            <div class="card-action">
              <a href="#" class="left">test</a>
              <a href="#">test</a>
              <a @click="test(item,'todo')" class="right">To Todo</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-panel yellow">
            TODO
          </div>
          <div class="card" id="card" v-for="(item, id) in todo">
            <div class="card-panel light">
              {{item.title}}
            </div>
            <div class="card-content">
              <p>Point: {{item.point}}</p>
              <p>In Charge: {{item.assign}}</p>
            </div>
            <div class="card-action">
              <a @click="test(item,'backlog')" class="left">test</a>
              <a href="#">test</a>
              <a@click="test(item,'doing')" class="right">test</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-panel blue">
            DOING
          </div>
          <div class="card" id="card" v-for="(item, id) in doing">
            <div class="card-panel light">
              {{item.title}}
            </div>
            <div class="card-content">
              <p>Point: {{item.point}}</p>
              <p>In Charge: {{item.assign}}</p>
            </div>
            <div class="card-action">
              <a @click="test(item,'todo')" class="left">test</a>
              <a href="#">test</a>
              <a @click="test(item,'done')" class="right">test</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-panel green">
            DONE
          </div>
          <div class="card" id="card" v-for="(item, id) in done">
            <div class="card-panel light">
              {{item.title}}
            </div>
            <div class="card-content">
              <p>Point: {{item.point}}</p>
              <p>In Charge: {{item.assign}}</p>
            </div>
            <div class="card-action">
              <a @click="test(item,'doing')" class="left">test</a>
              <a href="#">test</a>
              <a href="#" class="right">test</a>
            </div>
          </div>
        </div>
      </div>
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
import { kanban, db } from "../firebase"
export default {
  data: () => ({
    backlog: [],
    todo: [],
    doing: [],
    done: [],
    bottomPosition: 'md-bottom-right',
    showDialog: false
  }),
  created (){
    let self = this
    kanban.on('value', function(snapshot) {
      self.backlog= []
      self.todo= []
      self.doing= []
      self.done= []
      Object.entries(snapshot.val()).map(e=>{
        var value = Object.assign({},{id:e[0]},e[1])
        if(value.status == 'backlog'){
          self.backlog.push(value)
        }else if (value.status == 'todo') {
          self.todo.push(value)
        }else if (value.status == 'doing') {
          self.doing.push(value)
        }else {
          self.done.push(value)
        }
      })
  });
  },
  methods: {
    modalDialog: function() {
      this.showDialog = !this.showDialog
    },
    test: function (item,to) {
      kanban.child(item.id).set({
        title: item.title,
        point: item.point,
        assign: item.assign,
        status: to
      })
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
