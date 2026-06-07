import { ConfigPrintData } from '@/print/type'

export const SNAP_DISTANCE = 5

export const PAPER_PRESETS = [
  {
    label: 'A3',
    value: 'A3',
    width: 297,
    height: 420,
  },
  {
    label: 'A4',
    value: 'A4',
    width: 210,
    height: 297,
  },
  {
    label: 'A5',
    value: 'A5',
    width: 148,
    height: 210,
  },
  {
    label: 'B4',
    value: 'B4',
    width: 250,
    height: 353,
  },
  {
    label: 'B5',
    value: 'B5',
    width: 176,
    height: 250,
  },
  {
    label: '80mm小票',
    value: 'RECEIPT_80MM',
    width: 80,
    height: 200,
  },
  {
    label: '58mm小票',
    value: 'RECEIPT_58MM',
    width: 58,
    height: 200,
  },
  {
    label: '100×150面单',
    value: 'WAYBILL_100X150',
    width: 100,
    height: 150,
  },
]

export const mockData: ConfigPrintData = {
  orderNo: 'UC001',
  customerName: '客户小张',
  deliveryDate: '2026-06-03',
  items: [
    { name: '胡萝卜', unit: '斤', quantity: 12, price: '3.50' },
    { name: '土豆', unit: '斤', quantity: 8, price: '2.20' },
    { name: '菠菜', unit: '斤', quantity: 5, price: '4.00' },
  ],
}

export const injectedData: ConfigPrintData = {
  orderNo: 'UC999',
  customerName: '客户李四',
  deliveryDate: '2026-06-10',
  items: Array.from({ length: 40 }).map((_, index) => ({
    name: index < 4 ? ['西红柿', '黄瓜', '茄子', '青椒'][index] : '青椒',
    unit: '斤',
    quantity: index < 4 ? [20, 15, 10, 6][index] : 6,
    price: index < 4 ? ['5.00', '3.20', '4.50', '6.00'][index] : '6.00',
  })),
}
