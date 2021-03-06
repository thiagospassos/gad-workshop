<template>
  <div>
    <h1>Categories</h1>
    <b-table striped hover :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <div v-if="editingCategory.id != data.item.id">
          <button
            class="btn btn-secondary btn-sm"
            @click="edit(data.item, data.index)"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="btn btn-danger btn-sm"
            @click="remove(data.item, data.item.id)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div v-else>
          <button class="btn btn-primary btn-sm" @click="update()">
            <i class="fas fa-save"></i>
          </button>
          <button class="btn btn-default btn-sm" @click="cancelUpdate()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </template>
      <template v-slot:cell(name)="data">
        <template v-if="editingCategory.id != data.item.id">{{
          data.value
        }}</template>
        <template v-else>
          <input
            type="text"
            class="form-control"
            v-model="editingCategory.name"
          />
        </template>
      </template>
      <template v-slot:cell(description)="data">
        <template v-if="editingCategory.id != data.item.id">{{
          data.value
        }}</template>
        <template v-else>
          <input
            type="text"
            class="form-control"
            v-model="editingCategory.description"
          />
        </template>
      </template>
      <template slot="bottom-row">
        <td>
          <input
            type="text"
            v-model="addingCategory.name"
            placeholder="Name..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.name }"
          />
          <div class="invalid-feedback" v-if="errors && errors.name">
            {{ errors.name }}
          </div>
        </td>
        <td>
          <input
            type="text"
            v-model="addingCategory.description"
            placeholder="Description..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.description }"
          />
          <div class="invalid-feedback" v-if="errors && errors.description">
            {{ errors.description }}
          </div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary btn-sm" @click="add()">
              <i class="fas fa-plus"></i>
            </button>
            <button
              type="button"
              class="btn btn-default btn-sm"
              @click="resetAdd()"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </td> </template
    ></b-table>
  </div>
</template>

<script>
import { CategoriesService } from "@/services/NorthwindService.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      errors: null,
      fields: ["name", "description", "actions"],
      categories: [],
      editingCategory: {},
      editingIndex: null,
      addingCategory: {
        name: "",
        description: "",
      },
      defaultCategory: {
        name: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    ...mapActions(["raiseSuccessNotification", "raiseErrorNotification"]),
    validate(category) {
      this.errors = {};

      if (!category.name || !category.name.trim()) {
        this.errors.name = "Name is a required field";
      }
      if (!category.description || !category.description.trim()) {
        this.errors.description = "Description is a required field";
      }

      // If no errors added, set errors to null
      if (Object.keys(this.errors).length === 0) {
        this.errors = null;
      }
    },

    fetchAll() {
      CategoriesService.getAll()
        .then((result) => (this.categories = result.data))
        .catch(() =>
          this.raiseErrorNotification(
            "A server error occurred attempting to get all categories"
          )
        );
    },

    edit(category, index) {
      this.editingCategory = { ...category };
      this.editingIndex = index;
    },

    update() {
      CategoriesService.update(this.editingCategory)
        .then(() => {
          this.raiseSuccessNotification(
            `The category '${this.editingCategory.name}' was successfully updated.`
          );
          this.categories[this.editingIndex] = this.editingCategory;
          this.editingCategory = {};
        })
        .catch(() => {
          this.raiseErrorNotification(
            `A server error occurred attempting to update the category '${this.editingCategory.name}'.`
          );
        });
    },

    cancelUpdate() {
      this.editingCategory = {};
    },

    remove(cat, id) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete '${cat.name}'.`,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Delete",
            cancelVariant: "default",
            cancelTitle: "Cancel",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            CategoriesService.delete(id)
              .then(() => {
                this.categories = this.categories.filter((c) => c.id !== id);
                this.raiseSuccessNotification(
                  `The category was successfully deleted.`
                );
              })
              .catch(() => {
                this.raiseErrorNotification(
                  `A server error occurred attempting to delete the category.`
                );
              });
          }
        });
    },

    add() {
      this.validate(this.addingCategory);
      if (this.errors) {
        return;
      }
      CategoriesService.create(this.addingCategory)
        .then(() => {
          this.raiseSuccessNotification(
            `The category '${this.addingCategory.name}' was successfully created.`
          );
          this.fetchAll();
          this.resetAdd();
        })
        .catch(() => {
          this.raiseErrorNotification(
            `A server error occurred attempting to create the category '${this.addingCategory.name}'.`
          );
        });
    },

    resetAdd() {
      this.addingCategory = { ...this.defaultCategory };
    },
  },
};
</script>

<style scoped></style>
