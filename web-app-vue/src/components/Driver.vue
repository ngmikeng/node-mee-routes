<template>
	<div class="driver-component">
		<h1 class="header">Driver</h1>
		<div class="g-margin-bot-10">
      <a-button type="primary" @click="openModal">Add a Driver</a-button>
    </div>
    <a-table :columns="columns"
      :rowKey="record => { return record.id }"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="Are you sure you want to delete?"
          @confirm="() => { handleDelete(record.key) }">
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </template>
    </a-table>
	</div>
</template>

<script>
import axios from 'axios';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Status',
  dataIndex: 'status',
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}];

export default {
  name: 'driver',
  components: {
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      modalState: {
        visible: false,
        confirmLoading: false
      }
    }
  },
  methods: {
    fetch (params = {}) {
      this.loading = true
      axios({
        url: 'http://localhost:5858/api/v1/drivers',
        method: 'get',
        params: {
          results: 10,
          ...params,
        },
        type: 'json',
      }).then((result) => {
        if (result && result.data) {
          const pagination = { ...this.pagination };
          // pagination.total = 200;
          this.loading = false;
          this.data = result.data.data;
          this.pagination = pagination;
        }
      }).catch(err => this.loading = false);
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    openModal () {
      this.modalState.visible = true;
    },
    handleOkModal () {
      this.modalState.confirmLoading = true;
      setTimeout(() => {
        this.modalState.visible = false;
        this.modalState.confirmLoading = false;
      }, 2000);
    },
    handleCancelModal () {
      this.modalState.visible = false;
    }
  }
}
</script>

<style>
.driver-component {
}
</style>
