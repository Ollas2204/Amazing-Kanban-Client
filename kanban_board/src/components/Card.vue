<template>
  <div class="col s12 m6 l3">
    <div class="card">
      <div :class="'card-panel '+color">
        {{name}}
      </div>
      <div class="card" id="card" v-for="(item, id) in data">
        <div :class="'card-panel '+color">
          {{item.title}}
        </div>
        <div class="card-content">
          <p>Point: {{item.point}}</p>
          <p>In Charge: {{item.assign}}</p>
        </div>
        <div class="card-action">
          <button  @click="test(item,back)" class="left" v-if="back">Back</button>
          <button class="center" @click="remove(item.id)">Delete</button>
          <button @click="test(item,next)" class="right" v-if="next">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'board',
  props:['data','name'],
  data:()=>{
    return {
      next:null,
      back:null,
      color:''
    }
  },
  created(){
    switch (this.name) {
      case 'backlog':
        this.color='red'
        this.next='todo'
        break;
      case 'todo':
        this.color='yellow'
        this.next = 'doing',
        this.back = 'backlog'
        break;
      case 'doing':
        this.color = 'blue'
        this.next = 'done',
        this.back = 'todo'
        break;
      case 'done':
        this.color = 'green'
        this.back='doing'
        break;
      default:

    }
  },
  methods:{
    remove(id){
      this.$emit('remove',id)
    },
    test(item,name){
      console.log(name)
      this.$emit('test',item,name)
    }
  }
}
</script>
