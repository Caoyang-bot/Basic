<template>
    <div>
        <div id="calendar" ref="calendarRef"></div>
        <el-dialog v-model="dialogTableVisible" title="添加任务" width="500" :before-close="handleClose">
            <h3 v-if="end == ''">
                起始日期：{{ dayjs(start).format("YYYY-MM-DD") }}
            </h3>
            <h3 v-else>
                起始日期：{{ dayjs(start).format("YYYY-MM-DD") }}--{{
                dayjs(end).format("YYYY-MM-DD")
                }}
            </h3>
            <el-input v-model="input" style="width: 100%" placeholder="Please input" />
            <hr />
            <el-color-picker v-model="color" />
            <hr />
    
            <el-button type="primary" @click="save">{{
                isEdit.value ? "修改" : "添加"
                }}</el-button>
        </el-dialog>
    </div>
</template>
<script setup>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import esLocale from "@fullcalendar/core/locales/zh-cn";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const data = ref([
  {
    id: Math.random(32).toString(16).slice(6),
    title: "All Day Event",
    start: "2024-07-01",
  },
  {
    id: Math.random(32).toString(16).slice(6),
    title: "Long Event",
    start: "2024-07-07",
    end: "2024-07-10",
  },
]);
const calendarRef = ref();
let canendar = null;
const dialogTableVisible = ref(false);
const input = ref("");
const start = ref("");
const end = ref("");
const flag = ref("date"); //date是单个日期，range是范围
const color = ref("");
const isEdit = ref(false);
const editId = ref(null);

function handleClose() {
  dialogTableVisible.value = false;
  start.value = "";
  end.value = "";
  input.value = "";
  color.value = "";
  isEdit.value = false;
  editId.value = null;
}

function save() {
  let newEvent = null;
  if (isEdit.value) {
    //根据id获取对应数据源修改
    let event = canendar.getEventById(editId.value);
    data.value.forEach((item) => {
      if (item.id == editId.value) {
        event.setProp("title", input.value);
        event.setProp("backgroundColor", color.value);
        event.remove(); //移除原先的事件源
        canendar.addEvent(event); //再次添加
      }
    });
  } else {
    newEvent = {
      title: input.value,
      start: dayjs(start.value).format("YYYY-MM-DD"), //根据日期格式化，显示不同的任务样式
      id: Math.random(32).toString(16).slice(6),
      color: color.value,
    };

    if (flag == "date") {
      data.value.push(newEvent);
    } else {
      newEvent.end = dayjs(end.value).format("YYYY-MM-DD");
      data.value.push(newEvent);
    }
    canendar && canendar.addEvent(newEvent); //添加新的卡片数据并触发更新
  }

  dialogTableVisible.value = false;
  start.value = "";
  end.value = "";
  input.value = "";
  newEvent = null;
  color.value = "";
  editId.value = null;
  isEdit.value = false;
}
onMounted(() => {
  canendar = new Calendar(calendarRef.value, {
    //interaction需要添加，否则在日历中无法对任务进行拖拽操作
    plugins: [dayGridPlugin, interaction, multiMonthPlugin], //使用的插件
    timeZone: "UTC",
    initialView: "dayGridMonth", // 日历的排列方式
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridYear,dayGridWeek,dayGridDay",
    },
    editable: false, // 需要开启，否则无允许拖拽的效果
    droppable: true,
    events: data.value, //数据源，可以是一个地址
    selectable: false, //允许多行选中日历，开启会触发select事件
    locale: 'zh-ch', // 切换语言，当前为中文
    dateClick: function (info) {
      //单据某一个天的操作，无结束日期
      console.log("dateClick", info);
      flag.value = "date";
      dialogTableVisible.value = true;
      start.value = info.date;
      end.value = "";
    },
    select: function (info) {
      //选中多个日期，包含结束日期
      console.log("select", info);
      flag.value = "range";
      dialogTableVisible.value = true;
      start.value = info.start;
      end.value = info.end;
    },
    eventClick: function (info) {
      //单机事件卡片触发
      console.log("eventClick", info);
      dialogTableVisible.value = true;
      isEdit.value = true;
      editId.value = info.event.id;
      if (info.event.end === null) {
        flag.value = "date";
        start.value = info.event.start;
        end.value = "";
      } else {
        flag.value = "range";
        start.value = info.event.start;
        end.value = info.event.end;
      }
      color.value = info.event.backgroundColor;
      input.value = info.event.title;
    },
    locale: esLocale,
  });
  canendar.render();
});

</script>
