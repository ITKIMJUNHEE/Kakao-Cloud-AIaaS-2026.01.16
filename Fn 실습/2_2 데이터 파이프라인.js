// 문제 2-2: 데이터 파이프라인
// 데이터 처리 파이프라인을 함수형으로 구현하세요.

const orders = [
  { id: 1, customer: 'Kim', items: [{ name: 'Book', price: 15 }, { name: 'Pen', price: 3 }], status: 'completed' },
  { id: 2, customer: 'Lee', items: [{ name: 'Laptop', price: 1200 }], status: 'pending' },
  { id: 3, customer: 'Park', items: [{ name: 'Mouse', price: 25 }, { name: 'Keyboard', price: 75 }], status: 'completed' },
  { id: 4, customer: 'Kim', items: [{ name: 'Monitor', price: 300 }], status: 'completed' },
  { id: 5, customer: 'Choi', items: [{ name: 'USB', price: 10 }], status: 'cancelled' }
];

//TODO: 파이프라인 함수들 구현

// 1. 완료된 주문만 필터링
const completedOrders = orders.filter(order => order.status === 'completed');

// 2. 각 주문의 총액 계산
const ordersWithTotal = completedOrders.map(order => ({
  ...order,
  total: order.items.reduce((sum, item) => sum + item.price, 0)
}));

// 3. 고객별 총 구매액 계산
const customerTotals = ordersWithTotal.reduce((acc, curr) => {
  acc[curr.customer] = (acc[curr.customer] || 0) + curr.total;
  return acc;
}, {});

// 4. 가장 많이 구매한 고객 찾기
const topCustomer = Object.keys(customerTotals).reduce((acc, curr) => {
  return customerTotals[curr] > (customerTotals[acc] || 0) ? curr : acc;
}, '');

// 5. 전체 파이프라인
function getTopCustomer(orders) {
  //TODO: 위 과정을 하나의 파이프라인으로
  const totals = orders
    .filter(order => order.status === 'completed')
    .map(order => ({
      customer: order.customer,
      total: order.items.reduce((sum, item) => sum + item.price, 0)
    }))
    .reduce((acc, curr) => {
      acc[curr.customer] = (acc[curr.customer] || 0) + curr.total;
      return acc;
    }, {});

  const topName = Object.keys(totals).reduce((a, b) => (totals[a] > totals[b] ? a : b));

  return { customer: topName, total: totals[topName] };
}

console.log('--- 문제 2-2 결과 ---');
console.log(getTopCustomer(orders));
// { customer: 'Kim', total: 318 }