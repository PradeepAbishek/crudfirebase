<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="5">
      <v-data-table :headers="headers" :items="tableData" class="elevation-12 pa-3">
        <template v-slot:top>
          <v-sheet dark elevation="10" class="flex justify-between headingTop ttu" :color="color">
            <v-btn text>CRUD Operations</v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2" icon @click="addItem" v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Add Student</span>
            </v-tooltip>
          </v-sheet>
          <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
              <v-card-title>
                <v-sheet dark elevation="10" class="w-100 tc ttu" :color="color">
                  <h5>{{ newItem ? 'Create Student' : 'Update Student' }}</h5>
                </v-sheet>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="item.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.age" label="Age"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.email" label="Email Address"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.phoneNumber" label="Phone Number"></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" outlined @click="dialog = !dialog">Cancel</v-btn>
                <v-btn outlined color="success" @click="createItem" v-if="newItem">
                  <v-icon class="mr-2">mdi-plus</v-icon>Create
                </v-btn>
                <v-btn outlined color="success" @click="updateItem" v-else>
                  <v-icon class="mr-2">mdi-update</v-icon>Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="green"
                small
                class="mr-2"
                @click="editItem(item)"
                v-bind="attrs"
                v-on="on"
              >mdi-pencil</v-icon>
            </template>
            <span>Edit Student</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="red"
                small
                @click="deleteItem(item)"
                v-bind="attrs"
                v-on="on"
              >mdi-delete</v-icon>
            </template>
            <span>Delete Student</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import { studentsCollection, auth } from "../firebase";
export default {
  name: "Crud",
  data: () => ({
    newItem: false,
    dialog: false,
    headers: [
      { text: "Name", value: "name", sortable: false },
      { text: "Age", value: "age", sortable: false },
      { text: "Email Address", value: "email", sortable: false },
      { text: "Phone Number", value: "phoneNumber", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tableData: [],
    item: {},
  }),
  methods: {
    async getData() {
      this.tableData = [];
      var res = await studentsCollection
        .where("userId", "==", auth.currentUser.uid)
        .get();
      res.forEach((doc) => {
        var item = new Object();
        item = doc.data();
        item.id = doc.id;
        this.tableData.push(item);
      });
    },
    addItem() {
      this.newItem = true;
      this.dialog = true;
      this.item = Object.assign({});
    },
    editItem(item) {
      this.newItem = false;
      this.item = Object.assign({}, item);
      this.dialog = true;
    },
    async createItem() {
      var self = this;
      this.item.userId = auth.currentUser.uid;
      var res = await studentsCollection
        .add(self.item)
        .then((d) => self.snackbar("Student Added Successfully", true))
        .then((d) => self.$refs.form.reset())
        .then((d) => self.getData())
        .then((d) => (self.dialog = false))
        .catch((err) => self.snackbar(err.messge, false));
    },
    async updateItem() {
      var res = await studentsCollection.doc(this.item.id);
      res
        .set(this.item)
        .then((res) => (this.dialog = false))
        .then((res) => this.getData())
        .then((res) =>
          this.snackbar("Student Details Updated Successfully", true)
        )
        .catch((err) => self.snackbar(err.messge, false));
    },
    async deleteItem(item) {
      var res = await studentsCollection.doc(item.id);
      res
        .delete()
        .then((res) => this.getData())
        .then((res) => this.snackbar("Student Deleted Successfully", true))
        .catch((err) => self.snackbar(err.messge, false));
    },
    snackbar(msg, val) {
      var snackData = new Object();
      snackData.msg = msg;
      snackData.value = val;
      this.$store.dispatch("snackbar", snackData);
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
