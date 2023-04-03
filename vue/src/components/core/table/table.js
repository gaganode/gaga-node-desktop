import { ref, toRaw } from "vue";
import Swal from 'sweetalert2'

// var table_callback={
//   searchFn:xxxxx,
//   onSelectedRow:xxxx,
//   updateDelete:xxxxx,
//   updateSubmit:xxxxx,
//   createSubmit:xxxx,
// }

//mode =='remote' | 'local'
//queryFn a function : return false for err return true for found
function NewTableMgr(config, colums, table_callback) {
  let table_mgr = {};


  //////table ini config///////////
  table_mgr.config = {}
  table_mgr.config.mode = 'local'
  table_mgr.config.current_page = 1;
  table_mgr.config.per_page = 10;
  table_mgr.config.sort = [];
  table_mgr.config.perPageDropdown = [10, 20, 50, 100];
  table_mgr.config.select_enable=true;

  if (!config) {
    console.log("err:config required")
    return null
  }

  if (typeof config.mode == "undefined") {
    console.log("err:config.mode required")
    return null
  } else {
    table_mgr.config.mode = config.mode
  }

  if (typeof config.current_page != "undefined") {
    table_mgr.config.current_page = config.current_page
  }

  if (typeof config.per_page != "undefined") {
    table_mgr.config.per_page = config.per_page
  }

  if (typeof config.sort != "undefined") {
    table_mgr.config.sort = config.sort
  }

  if (typeof config.perPageDropdown != "undefined") {
    table_mgr.config.perPageDropdown = config.perPageDropdown
  }

  if (typeof config.select_enable != "undefined") {
    table_mgr.config.select_enable = config.select_enable
  }

  ///////////////////////////////////////
  if (!colums) {
    console.log("err:colums required")
    return null
  }

  if (!table_callback) {
    console.log("err:table_callback required")
    return null
  }

  if (typeof table_callback.searchFn == "undefined") {
    console.log("err:table_callback searchFn required")
    return null
  }

  table_mgr.table_callback = table_callback;

  //
  table_mgr.getFromServer = async function () {
    return table_mgr.table_callback.searchFn(table_mgr)
  }

  table_mgr.onSelectedRows = function (rows) {
    if (typeof table_mgr.table_callback.onSelectedRows != "undefined") {
      table_mgr.table_callback.onSelectedRows(rows)
    }
  }

  table_mgr.OpenUpdateWindow = function (row) {
    table_mgr.setCurrentRowData(toRaw(row));
    table_mgr.update_w_open.value = true;
  }

  table_mgr.CloseUpdateWindow = async function () {
    table_mgr.update_w_loader_open.value = false
    table_mgr.update_w_open.value = false
  }

  table_mgr.Update = async function () {
    if (typeof table_mgr.table_callback.updateSubmit != "undefined") {
      table_mgr.update_w_loader_open.value = true
      let result = await table_mgr.table_callback.updateSubmit(table_mgr)
      table_mgr.update_w_loader_open.value = false
      if (result) {
        table_mgr.update_w_open.value = false
        table_mgr.loadItems();
      }
    }
  }

  table_mgr.UpdateDelete = async function () {

    let result = await Swal.fire({
      text: "Do you confirm?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirm Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    if (typeof table_mgr.table_callback.updateDelete != "undefined") {
      table_mgr.update_w_loader_open.value = true
      let result = await table_mgr.table_callback.updateDelete(table_mgr)
      table_mgr.update_w_loader_open.value = false
      if (result !== false) {
        table_mgr.update_w_open.value = false
        table_mgr.loadItems();
      }
    }
  }

  table_mgr.OpenCreateWindow = function () {
    table_mgr.create_w_open.value = true;
  }

  table_mgr.CloseCreateWindow = async function () {
    table_mgr.create_w_loader_open.value = false
    table_mgr.create_w_open.value = false
  }

  table_mgr.Create = async function () {
    if (typeof table_mgr.table_callback.createSubmit != "undefined") {
      table_mgr.create_w_loader_open.value = true
      let result = await table_mgr.table_callback.createSubmit(table_mgr)
      table_mgr.create_w_loader_open.value = false
      if (result !== false) {
        table_mgr.create_w_open.value = false
        table_mgr.loadItems();
      }
    }
  }

  ////////////////////////////////////////

  table_mgr.currentRowData = ref(null);

  table_mgr.setCurrentRowData = function (row) {
    table_mgr.currentRowData.value = JSON.parse(JSON.stringify(row))
  };
  ///////////////////
  table_mgr.columns = colums;

  ///////////////////
  table_mgr.isLoading = ref(false);

  table_mgr.showTableLoader=function(){
    table_mgr.isLoading.value=true
  }

  table_mgr.hideTableLoader=function(){
    table_mgr.isLoading.value=false
  }
  
  

  table_mgr.update_w_open = ref(false);
  table_mgr.update_w_loader_open = ref(false);

  table_mgr.create_w_open = ref(false);
  table_mgr.create_w_loader_open = ref(false);

  table_mgr.search_w_open = ref(false);


  ///////////////////
  table_mgr.rows = ref([]);
  table_mgr.totalRecords = ref(0);


  table_mgr.getLimitOffset = function () {
    return {
      limit: table_mgr.config.per_page,
      offset: (table_mgr.config.current_page - 1) * table_mgr.config.per_page,
    };
  };

  table_mgr.onPageChange = function (params) {
    table_mgr.config.current_page = params.currentPage;
    table_mgr.loadItems();
  };

  table_mgr.onPerPageChange = function (params) {
    table_mgr.config.current_page = 1;
    table_mgr.config.per_page = params.currentPerPage;
    table_mgr.loadItems();
  };

  table_mgr.onSortChange = function (params) {
    if (params[0].type == "none") {
      table_mgr.config.sort = [];
    } else {
      table_mgr.config.sort = [
        {
          type: params[0].type,
          field: params[0].field,
        },
      ];
    }
    table_mgr.loadItems();
  };

  // load items is what brings back the rows from server
  table_mgr.loadItems = function () {
    table_mgr.isLoading.value = true;
    table_mgr.getFromServer().then((response) => {
      table_mgr.isLoading.value = false;
      table_mgr.totalRecords.value = response.total_count;
      table_mgr.rows.value = response.data;
    });
  };

  table_mgr.toggleSearchWindow = function () {
    table_mgr.search_w_open.value = !table_mgr.search_w_open.value;
  };

  table_mgr.openSearchWindow = function () {
    table_mgr.search_w_open.value = true;
  };

  table_mgr.closeSearchWindow = function () {
    table_mgr.search_w_open.value = false;
  };

  //simulate remote query sleep
  table_mgr.sleep = (d) => new Promise((r) => setTimeout(r, d));
  ///////////////////////////////////////////////////

  //
  table_mgr.pagination_options = {
    enabled: true,
    mode: 'pages',
    perPage: table_mgr.config.per_page,
    perPageDropdown: table_mgr.config.perPageDropdown,
    setCurrentPage: table_mgr.config.current_page,
    dropdownAllowAll: false,
  };

  table_mgr.select_options = {
    enabled: table_mgr.config.select_enable,
    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
  }

  table_mgr.search_options = {
    enabled: true,
    placeholder: 'search table',
  }
  //

  return {
    tableMgr: table_mgr,
    currentRow: table_mgr.currentRowData,
    update_w_open: table_mgr.update_w_open,
    update_w_loader_open: table_mgr.update_w_loader_open,
    create_w_open: table_mgr.create_w_open,
    create_w_loader_open: table_mgr.create_w_loader_open,
  }
}

export { NewTableMgr as NewTableMgr };
