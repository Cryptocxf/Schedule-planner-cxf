const { spawnSync } = require('child_process');
const path = require('path');

const tuniuPath = 'C:\\WINDOWS\\system32\\config\\systemprofile\\AppData\\Roaming\\npm\\node_modules\\tuniu-cli\\bin\\tuniu.js';
const apiKey = 'your_tuniu_api_key';

function callTuniu(server, tool, params) {
    const result = spawnSync('node', [tuniuPath, 'call', server, tool, '-a', JSON.stringify(params)], {
        env: { ...process.env, TUNIU_API_KEY: apiKey },
        encoding: 'utf8',
        timeout: 30000
    });
    
    if (result.error) {
        console.error('Error:', result.error.message);
        return null;
    }
    
    try {
        const parsed = JSON.parse(result.stdout);
        if (parsed.result && parsed.result.content && parsed.result.content[0]) {
            return JSON.parse(parsed.result.content[0].text);
        }
        console.error('Invalid response structure:', parsed);
        return null;
    } catch (e) {
        console.error('Parse error:', e.message);
        console.error('Raw output:', result.stdout);
        return null;
    }
}

// 1. 查询杭州→北京航班（今天 6 月 4 日）
console.log('=== 查询杭州→北京航班 (6 月 4 日) ===');
const flights1 = callTuniu('flight', 'searchLowestPriceFlight', {
    departureCityName: '杭州',
    arrivalCityName: '北京',
    departureDate: '2026-06-04'
});
console.log('杭州→北京:', flights1 ? (flights1.flightList?.length || flights1.data?.length || 0) + ' 个航班' : '失败');

// 2. 查询北京→秦皇岛高铁（明天 6 月 5 日）
console.log('\n=== 查询北京→秦皇岛高铁 (6 月 5 日) ===');
const trains1 = callTuniu('train', 'searchLowestPriceTrain', {
    departureCityName: '北京',
    arrivalCityName: '秦皇岛',
    departureDate: '2026-06-05'
});
console.log('北京→秦皇岛:', trains1 ? `${trains1.data?.length || 0} 个车次` : '失败');

// 3. 查询秦皇岛→杭州航班（后天 6 月 6 日）
console.log('\n=== 查询秦皇岛→杭州航班 (6 月 6 日) ===');
const flights2 = callTuniu('flight', 'searchLowestPriceFlight', {
    departureCityName: '秦皇岛',
    arrivalCityName: '杭州',
    departureDate: '2026-06-06'
});
console.log('秦皇岛→杭州:', flights2 ? (flights2.flightList?.length || flights2.data?.length || 0) + ' 个航班' : '失败');

// 4. 查询北京酒店（6 月 4 日入住，6 月 5 日退房）
console.log('\n=== 查询北京酒店 (6 月 4 日 -5 日) ===');
const beijingHotels = callTuniu('hotel', 'tuniu_hotel_search', {
    cityName: '北京',
    checkIn: '2026-06-04',
    checkOut: '2026-06-05',
    keyword: '全季'
});
console.log('北京酒店:', beijingHotels ? `${beijingHotels.hotels?.length || 0} 家` : '失败');

// 5. 查询秦皇岛酒店（6 月 5 日入住，6 月 6 日退房）
console.log('\n=== 查询秦皇岛酒店 (6 月 5 日 -6 日) ===');
const qhdHotels = callTuniu('hotel', 'tuniu_hotel_search', {
    cityName: '秦皇岛',
    checkIn: '2026-06-05',
    checkOut: '2026-06-06',
    keyword: '全季'
});
console.log('秦皇岛酒店:', qhdHotels ? `${qhdHotels.hotels?.length || 0} 家` : '失败');

// 输出详细数据
console.log('\n\n=== 详细数据 ===');
console.log('\n【杭州→北京航班】');
if (flights1 && flights1.flightList) {
    flights1.flightList.slice(0, 5).forEach(f => {
        console.log(`  ${f.flightNo} | ${f.departureTime}-${f.arrivalTime} | ¥${f.price}`);
    });
}

console.log('\n【北京→秦皇岛高铁】');
if (trains1 && trains1.data) {
    trains1.data.slice(0, 5).forEach(t => {
        console.log(`  ${t.trainNum} | ${t.departureTime.split(' ')[1]}-${t.arrivalTime.split(' ')[1]} | ¥${t.price?.wzPrice || t.price}`);
    });
}

console.log('\n【秦皇岛→杭州航班】');
if (flights2 && flights2.flightList) {
    flights2.flightList.slice(0, 5).forEach(f => {
        console.log(`  ${f.flightNo} | ${f.flightNo ? f.departureTime : 'N/A'} | ¥${f.price}`);
    });
}

console.log('\n【北京酒店】');
if (beijingHotels && beijingHotels.hotels) {
    beijingHotels.hotels.slice(0, 5).forEach(h => {
        console.log(`  ${h.hotelName} | ¥${h.lowestPrice} | ${h.business} | 评分${h.commentScore}`);
    });
}

console.log('\n【秦皇岛酒店】');
if (qhdHotels && qhdHotels.hotels) {
    qhdHotels.hotels.slice(0, 5).forEach(h => {
        console.log(`  ${h.hotelName} | ¥${h.lowestPrice} | ${h.business} | 评分${h.commentScore}`);
    });
}
