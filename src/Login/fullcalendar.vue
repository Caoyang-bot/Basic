<!-- 日历 -->
<template>
  <div class="calendar-container">
    <div id="calendar" ref="calendarRef"></div>
  
    <el-dialog v-model="dialogVisible" title="编辑事件" width="500px">
      <el-form>
        <el-form-item label="事件标题">
          <el-input v-model="eventTitle" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="eventDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="eventColor" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEvent">保存</el-button>
      </template>
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
    id: Math.random().toString(36).substring(2, 9),
    title: "示例事件",
    start: dayjs().format("YYYY-MM-DD"),
    color: "#3a86ff"
  }
]);

const calendarRef = ref();
let calendar = null;
const dialogVisible = ref(false);
const eventTitle = ref("");
const eventDate = ref("");
const eventColor = ref("#3a86ff");
const currentEventId = ref(null);

function saveEvent() {
  if (currentEventId.value) {
    // 更新现有事件
    const event = calendar.getEventById(currentEventId.value);
    if (event) {
      event.setProp("title", eventTitle.value);
      event.setProp("start", eventDate.value);
      event.setProp("backgroundColor", eventColor.value);
    }
  } else {
    // 添加新事件
    const newEvent = {
      id: Math.random().toString(36).substring(2, 9),
      title: eventTitle.value,
      start: eventDate.value,
      backgroundColor: eventColor.value
    };
    calendar.addEvent(newEvent);
    data.value.push(newEvent);
  }
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  eventTitle.value = "";
  eventDate.value = "";
  eventColor.value = "#3a86ff";
  currentEventId.value = null;
}

onMounted(() => {
  calendar = new Calendar(calendarRef.value, {
    plugins: [dayGridPlugin, interaction, multiMonthPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay"
    },
    locale: esLocale,
    firstDay: 1,
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    events: data.value,
    eventDisplay: "block",
    eventColor: "#3788d8",
    eventClick: (info) => {
      currentEventId.value = info.event.id;
      eventTitle.value = info.event.title;
      eventDate.value = dayjs(info.event.start).format("YYYY-MM-DD");
      eventColor.value = info.event.backgroundColor || "#3a86ff";
      dialogVisible.value = true;
    },
    dateClick: (info) => {
      currentEventId.value = null;
      eventTitle.value = "";
      eventDate.value = info.dateStr;
      eventColor.value = "#3a86ff";
      dialogVisible.value = true;
    }
  });
  
  calendar.render();
});
</script>

<style scoped>
.calendar-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}

#calendar {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* FullCalendar 自定义样式 */
:deep(.fc) {
  font-size: 14px;
}

:deep(.fc-toolbar-title) {
  font-size: 1.5em;
  font-weight: bold;
}

:deep(.fc-button) {
  background-color: #f0f0f0;
  border: none;
  color: #333;
  font-weight: normal;
}

:deep(.fc-button-active) {
  background-color: #3a86ff;
  color: white;
}

:deep(.fc-daygrid-day-number) {
  color: #333;
  font-weight: bold;
}

:deep(.fc-daygrid-day.fc-day-today) {
  background-color: rgba(58, 134, 255, 0.1);
}

:deep(.fc-event) {
  border-radius: 4px;
  border: none;
  padding: 2px 5px;
  font-size: 13px;
  cursor: pointer;
}
</style>
