import { useState, useMemo, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Reemplaza estos textos con los valores que copiaste en el Paso 1
const supabaseUrl = "https://sdagwbhgpmqggxblairs.supabase.co";
const supabaseKey = "sb_publishable_YYQCQ4KspjPKcQ0pQ8EJhA_3kiiB1A2";
const supabase = createClient(supabaseUrl, supabaseKey);
/* ================= DATA ================= */

const STOCK_INICIAL = [
  { id: 1, producto: "Polera estampada manga larga", almacen: "Bodega Central", cantidad: 1228 },
  { id: 2, producto: "Suéter beige", almacen: "Bodega Central", cantidad: 942 },
  { id: 3, producto: "Polera básica manga corta", almacen: "Bodega Central", cantidad: 912 },
  { id: 4, producto: "Pantalón deportivo blanco", almacen: "Bodega Central", cantidad: 886 },
  { id: 5, producto: "Pantalón estampado beige", almacen: "Bodega Central", cantidad: 784 },
  { id: 6, producto: "Cardigan rosado", almacen: "Bodega Central", cantidad: 782 },
  { id: 7, producto: "Blusa animal print", almacen: "Bodega Central", cantidad: 698 },
  { id: 8, producto: "Polera estampada manga corta", almacen: "Bodega Central", cantidad: 652 },
  { id: 9, producto: "Chaqueta gris", almacen: "Bodega Central", cantidad: 620 },
  { id: 10, producto: "Chaqueta negra con diseño rojo", almacen: "Bodega Central", cantidad: 614 },
  { id: 11, producto: "Chaqueta estampada gris", almacen: "Bodega Central", cantidad: 606 },
  { id: 12, producto: "Abrigo negro largo", almacen: "Bodega Central", cantidad: 606 },
  { id: 13, producto: "Abrigo gris claro largo", almacen: "Bodega Central", cantidad: 574 },
  { id: 14, producto: "Chaqueta mezclilla azul", almacen: "Bodega Central", cantidad: 564 },
];

const MOVIMIENTOS = [
  { id: 1, producto: "Camisa Formal", tipo: "Entrada", cantidad: 200, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 2, producto: "Jeans Clásico", tipo: "Entrada", cantidad: 150, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 3, producto: "Chaqueta Impermeable", tipo: "Entrada", cantidad: 80, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 4, producto: "Calcetines Pack x3", tipo: "Entrada", cantidad: 500, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 5, producto: "Camisa Formal", tipo: "Transferencia", cantidad: 30, almacen: "Bodega Central -> Tienda Norte", notas: "Transferencia a tienda" },
  { id: 6, producto: "Jeans Clásico", tipo: "Transferencia", cantidad: 25, almacen: "Bodega Central -> Tienda Norte", notas: "Transferencia a tienda" },
  { id: 7, producto: "Polera estampada manga larga", tipo: "Entrada", cantidad: 300, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 8, producto: "Suéter beige", tipo: "Entrada", cantidad: 200, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 9, producto: "Cardigan rosado", tipo: "Entrada", cantidad: 400, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 10, producto: "Blusa animal print", tipo: "Entrada", cantidad: 250, almacen: "Bodega Central", notas: "Compra inicial de inventario" },
  { id: 11, producto: "Suéter beige", tipo: "Salida", cantidad: 50, almacen: "Bodega Central", notas: "Venta mayorista - Comercial del Sur" },
  { id: 12, producto: "Chaqueta gris", tipo: "Salida", cantidad: 35, almacen: "Bodega Central", notas: "Venta mayorista - Empresa ABC SpA" },
];

const VENTAS = [
  {
    id: "fr3357ny", cliente: "Empresa ABC SpA", fecha: "-", estado: "Pagado", monto: 3034417,
    tipoDoc: "Factura", subtotal: 2549931, impuesto: 484486, pagado: 3034417, pendiente: 0,
    items: [
      { producto: "Polera estampada manga larga", cantidad: 300, precio: 5100, descuento: 0 },
      { producto: "Suéter beige", cantidad: 120, precio: 6400, descuento: 15000 },
      { producto: "Chaqueta gris", cantidad: 60, precio: 7900, descuento: 0 },
    ],
    pagos: [{ metodo: "Transferencia", estado: "Completado", fecha: "19/6/2026, 11:15:18 a.m.", total: 3034417 }],
  },
  {
    id: "ggnlo8s4", cliente: "Pedro González", fecha: "-", estado: "Pagado", monto: 345088,
    tipoDoc: "Boleta", subtotal: 290000, impuesto: 55088, pagado: 345088, pendiente: 0,
    items: [
      { producto: "Polera básica manga corta", cantidad: 40, precio: 5100, descuento: 0 },
      { producto: "Cardigan rosado", cantidad: 15, precio: 5700, descuento: 0 },
    ],
    pagos: [{ metodo: "Webpay", estado: "Completado", fecha: "17/6/2026, 3:42:10 p.m.", total: 345088 }],
  },
  {
    id: "8oocmg86", cliente: "Comercial del Sur Ltda", fecha: "-", estado: "Pagado", monto: 410336,
    tipoDoc: "Factura", subtotal: 344820, impuesto: 65516, pagado: 410336, pendiente: 0,
    items: [{ producto: "Suéter beige", cantidad: 50, precio: 6400, descuento: 0 }, { producto: "Blusa animal print", cantidad: 5, precio: 4964, descuento: 0 }],
    pagos: [{ metodo: "Transferencia", estado: "Completado", fecha: "16/6/2026, 9:20:44 a.m.", total: 410336 }],
  },
  {
    id: "fgrw5d3t", cliente: "Laura Martínez", fecha: "-", estado: "Pagado", monto: 166529,
    tipoDoc: "Boleta", subtotal: 139940, impuesto: 26589, pagado: 166529, pendiente: 0,
    items: [{ producto: "Abrigo negro largo", cantidad: 10, precio: 13994, descuento: 0 }],
    pagos: [{ metodo: "Webpay", estado: "Completado", fecha: "14/6/2026, 6:05:31 p.m.", total: 166529 }],
  },
  {
    id: "0gbdqzf8", cliente: "Tech Solutions Chile", fecha: "-", estado: "Pagado", monto: 303010,
    tipoDoc: "Factura", subtotal: 254630, impuesto: 48380, pagado: 303010, pendiente: 0,
    items: [
      { producto: "Polera estampada manga corta", cantidad: 24, precio: 5100, descuento: 0 },
      { producto: "Pantalón estampado beige", cantidad: 12, precio: 6400, descuento: 12000 },
      { producto: "Polera básica manga corta", cantidad: 18, precio: 5100, descuento: 0 },
    ],
    pagos: [{ metodo: "Webpay", estado: "Completado", fecha: "29/5/2026, 2:42:40 a.m.", total: 303010 }],
  },
  {
    id: "okwglw7x", cliente: "Pedro González", fecha: "-", estado: "Pendiente", monto: 713988,
    tipoDoc: "Factura", subtotal: 600000, impuesto: 113988, pagado: 0, pendiente: 713988,
    items: [{ producto: "Chaqueta mezclilla azul", cantidad: 60, precio: 10000, descuento: 0 }],
    pagos: [],
  },
  {
    id: "2esc2cyh", cliente: "Comercial del Sur Ltda", fecha: "-", estado: "Cancelado", monto: 1070988,
    tipoDoc: "Factura", subtotal: 900000, impuesto: 170988, pagado: 0, pendiente: 0,
    items: [{ producto: "Abrigo gris claro largo", cantidad: 64, precio: 14062, descuento: 0 }],
    pagos: [],
  },
  {
    id: "xt1ehnan", cliente: "Tech Solutions Chile", fecha: "-", estado: "Pagado", monto: 2849836,
    tipoDoc: "Factura", subtotal: 2394820, impuesto: 455016, pagado: 2849836, pendiente: 0,
    items: [
      { producto: "Polera estampada manga larga", cantidad: 280, precio: 5100, descuento: 0 },
      { producto: "Pantalón deportivo blanco", cantidad: 150, precio: 6500, descuento: 0 },
    ],
    pagos: [{ metodo: "Transferencia", estado: "Completado", fecha: "10/6/2026, 10:12:03 a.m.", total: 2849836 }],
  },
];

const EMPLEADOS = [
  { id: 1, nombre: "Admin General", correo: "admin@warehouse.cl", rol: "Administrador", estado: "Activo" },
  { id: 2, nombre: "Ana Bodeguera", correo: "bodega2@warehouse.cl", rol: "Bodeguero", estado: "Activo" },
  { id: 3, nombre: "Carlos Vendedor", correo: "vendedor1@warehouse.cl", rol: "Vendedor", estado: "Activo" },
  { id: 4, nombre: "Juan Bodeguero", correo: "bodega1@warehouse.cl", rol: "Bodeguero", estado: "Activo" },
  { id: 5, nombre: "Maria Vendedora", correo: "vendedor2@warehouse.cl", rol: "Vendedor", estado: "Activo" },
];

const ROLES = [
  { id: 1, nombre: "Administrador", descripcion: "Acceso total al sistema", permisos: ["Inventario", "Ventas", "Empleados", "Roles", "Consultas"], usuarios: 1 },
  { id: 2, nombre: "Vendedor", descripcion: "Gestión de ventas y consultas de clientes", permisos: ["Ventas", "Consultas", "Stock (ver)"], usuarios: 2 },
  { id: 3, nombre: "Bodeguero", descripcion: "Gestión de stock y movimientos de inventario", permisos: ["Inventario", "Movimientos"], usuarios: 2 },
];

/* ================= HELPERS ================= */

const clp = (n) => "$" + n.toLocaleString("en-US");

const Badge = ({ children, tone }) => {
  const tones = {
    green: "bg-emerald-700 text-white",
    greenSoft: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${tones[tone] || tones.gray}`}>
      {children}
    </span>
  );
};

const estadoVentaBadge = (estado) => {
  if (estado === "Pagado") return <Badge tone="green">Pagado</Badge>;
  if (estado === "Pendiente") return <Badge tone="gray">Pendiente</Badge>;
  return <Badge tone="red">Cancelado</Badge>;
};

const estadoConsultaBadge = (estado) => {
  if (estado === "Nueva") return <Badge tone="amber">Nueva</Badge>;
  if (estado === "Contactado") return <Badge tone="blue">Contactado</Badge>;
  if (estado === "Convertida") return <Badge tone="green">Convertida en venta</Badge>;
  return <Badge tone="gray">Descartada</Badge>;
};

const movBadge = (tipo) => {
  if (tipo === "Entrada") return <Badge tone="green">Entrada</Badge>;
  if (tipo === "Salida") return <Badge tone="red">Salida</Badge>;
  return <Badge tone="gray">Transferencia</Badge>;
};

const SearchInput = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
  />
);

const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
    </div>
    {action}
  </div>
);

const GreenBtn = ({ children, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
    <span className="text-base leading-none">+</span> {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl ${className}`}>{children}</div>
);

/* ================= ICONS (inline SVG, lucide-style) ================= */

const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {d}
  </svg>
);

const icons = {
  home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  stock: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  mov: <><path d="m17 3 4 4-4 4"/><path d="M21 7H9"/><path d="m7 21-4-4 4-4"/><path d="M3 17h12"/></>,
  cart: <><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></>,
  chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></>,
  edit: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></>,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
  back: <><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>,
  x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
};

/* ================= MODULES ================= */

function Inicio({ consultas, setPage }) {
  const nuevas = consultas.filter((c) => c.estado === "Nueva").length;
  const stats = [
    { label: "Productos en stock", value: "9.468", sub: "14 productos activos" },
    { label: "Ventas del mes", value: clp(8983314), sub: "8 ventas registradas" },
    { label: "Consultas pendientes", value: String(nuevas), sub: "Recibidas fuera de horario", highlight: nuevas > 0 },
    { label: "Pedidos por despachar", value: "3", sub: "Todos los días 16:00–17:00" },
  ];
  return (
    <div>
      <PageHeader title="Inicio" subtitle="Resumen general" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className={`p-5 ${s.highlight ? "border-amber-300 bg-amber-50/40" : ""}`}>
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </Card>
        ))}
      </div>
      {nuevas > 0 && (
        <Card className="p-4 flex items-center justify-between border-l-4 border-l-amber-400">
          <div className="flex items-center gap-3">
            <span className="text-amber-500"><Icon d={icons.chat} size={20} /></span>
            <p className="text-sm text-gray-700">
              Tienes <span className="font-semibold">{nuevas} consulta{nuevas > 1 ? "s" : ""} nueva{nuevas > 1 ? "s" : ""}</span> recibida{nuevas > 1 ? "s" : ""} por WhatsApp fuera del horario laboral.
            </p>
          </div>
          <button onClick={() => setPage("consultas")} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            Revisar consultas →
          </button>
        </Card>
      )}
    </div>
  );
}

function Stock() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => STOCK_INICIAL.filter((r) => r.producto.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div>
      <PageHeader title="Stock" subtitle="Inventario" action={<GreenBtn>Ajustar Stock</GreenBtn>} />
      <Card className="p-5">
        <div className="mb-4"><SearchInput value={q} onChange={setQ} placeholder="Buscar stock..." /></div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Producto</th>
              <th className="pb-3 font-medium">Almacén</th>
              <th className="pb-3 font-medium text-right">Cantidad</th>
              <th className="pb-3 font-medium pl-6">Estado</th>
              <th className="pb-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 text-gray-800">{r.producto}</td>
                <td className="py-3 text-gray-600">{r.almacen}</td>
                <td className="py-3 text-right text-gray-800">{r.cantidad.toLocaleString("en-US")}</td>
                <td className="py-3 pl-6"><Badge tone="green">En stock</Badge></td>
                <td className="py-3 text-right text-gray-400">
                  <button className="hover:text-gray-700"><Icon d={icons.edit} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Movimientos() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => MOVIMIENTOS.filter((r) => (r.producto + r.notas).toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div>
      <PageHeader title="Movimientos de Inventario" subtitle="Inventario" action={<GreenBtn>Nuevo Movimiento</GreenBtn>} />
      <Card className="p-5">
        <div className="mb-4"><SearchInput value={q} onChange={setQ} placeholder="Buscar movimientos..." /></div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Producto</th>
              <th className="pb-3 font-medium">Tipo de Movimiento</th>
              <th className="pb-3 font-medium text-right">Cantidad</th>
              <th className="pb-3 font-medium pl-6">Almacén</th>
              <th className="pb-3 font-medium">Notas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 text-gray-800">{r.producto}</td>
                <td className="py-3">{movBadge(r.tipo)}</td>
                <td className="py-3 text-right text-gray-800">{r.cantidad}</td>
                <td className="py-3 pl-6 text-gray-600">{r.almacen}</td>
                <td className="py-3 text-gray-400">{r.notas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Ventas({ ventaSel, setVentaSel }) {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("__all__");
  const rows = useMemo(
    () =>
      VENTAS.filter(
        (v) =>
          (filtro === "__all__" || v.estado === filtro) &&
          (v.cliente + v.id).toLowerCase().includes(q.toLowerCase())
      ),
    [q, filtro]
  );

  if (ventaSel) {
    const v = VENTAS.find((x) => x.id === ventaSel);
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setVentaSel(null)} className="text-gray-500 hover:text-gray-800">
              <Icon d={icons.back} size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalle de Venta</h1>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{v.id}</p>
            </div>
          </div>
          {estadoVentaBadge(v.estado)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card className="p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">Ventas</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Cliente</span><span className="text-gray-800">{v.cliente}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Tipo de Documento</span><span className="text-gray-800">{v.tipoDoc}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Fecha</span><span className="text-gray-800">{v.fecha}</span></div>
            </div>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">Resumen de Pago</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-gray-800">{clp(v.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Monto Impuesto</span><span className="text-gray-800">{clp(v.impuesto)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Pagado</span><span className="text-gray-800">{clp(v.pagado)}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Pendiente</span><span className="text-gray-800">{clp(v.pendiente)}</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Monto Total</span>
                <span className="font-semibold text-gray-900">{clp(v.monto)}</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5 mb-4">
          <p className="text-sm font-medium text-gray-800 mb-4">Items de Venta</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2.5 font-medium">Producto</th>
                <th className="pb-2.5 font-medium text-right">Cantidad</th>
                <th className="pb-2.5 font-medium text-right">Precio Unitario</th>
                <th className="pb-2.5 font-medium text-right">Monto Descuento</th>
                <th className="pb-2.5 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {v.items.map((it, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 text-gray-800">{it.producto}</td>
                  <td className="py-2.5 text-right text-gray-800">{it.cantidad}</td>
                  <td className="py-2.5 text-right text-gray-800">{clp(it.precio)}</td>
                  <td className="py-2.5 text-right text-gray-800">{clp(it.descuento)}</td>
                  <td className="py-2.5 text-right text-gray-800">{clp(it.cantidad * it.precio - it.descuento)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-800">Pagos</p>
            <GreenBtn>Nuevo Pago</GreenBtn>
          </div>
          {v.pagos.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">Sin pagos registrados. Registra el primer pago de esta venta.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2.5 font-medium">Método de Pago</th>
                  <th className="pb-2.5 font-medium">Estado</th>
                  <th className="pb-2.5 font-medium">Referencia</th>
                  <th className="pb-2.5 font-medium">Fecha de Pago</th>
                  <th className="pb-2.5 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {v.pagos.map((p, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-gray-800">{p.metodo}</td>
                    <td className="py-2.5"><Badge tone="green">{p.estado}</Badge></td>
                    <td className="py-2.5 text-gray-400">—</td>
                    <td className="py-2.5 text-gray-600">{p.fecha}</td>
                    <td className="py-2.5 text-right text-gray-800">{clp(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Ventas" subtitle="Ventas" action={<GreenBtn>Nueva Venta</GreenBtn>} />
      <Card className="p-5">
        <div className="flex gap-3 mb-4">
          <div className="w-72"><SearchInput value={q} onChange={setQ} placeholder="Buscar ventas..." /></div>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            <option value="__all__">__all__</option>
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>Cancelado</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">N° Venta</th>
              <th className="pb-3 font-medium">Cliente</th>
              <th className="pb-3 font-medium">Fecha</th>
              <th className="pb-3 font-medium">Estado</th>
              <th className="pb-3 font-medium text-right">Monto Total</th>
              <th className="pb-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 font-mono text-gray-700 text-xs">{v.id}</td>
                <td className="py-3 text-gray-800">{v.cliente}</td>
                <td className="py-3 text-gray-400">{v.fecha}</td>
                <td className="py-3">{estadoVentaBadge(v.estado)}</td>
                <td className="py-3 text-right text-gray-800">{clp(v.monto)}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-2 text-gray-400">
                    <button onClick={() => setVentaSel(v.id)} className="hover:text-gray-700"><Icon d={icons.eye} /></button>
                    {v.estado === "Pendiente" && <button className="hover:text-red-500"><Icon d={icons.x} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Consultas({ consultas, setConsultas }) {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("__all__");
  const [sel, setSel] = useState(null);

  const rows = useMemo(
    () =>
      consultas.filter(
        (c) =>
          (filtro === "__all__" || c.estado === filtro) &&
          (c.nombre + c.producto + c.cliente).toLowerCase().includes(q.toLowerCase())
      ),
    [consultas, q, filtro]
  );

  const cambiarEstado = (id, estado) => {
    setConsultas((prev) => prev.map((c) => (c.id === id ? { ...c, estado } : c)));
    setSel(null);
  };

  const detalle = sel ? consultas.find((c) => c.id === sel) : null;

  if (detalle) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSel(null)} className="text-gray-500 hover:text-gray-800">
              <Icon d={icons.back} size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalle de Consulta</h1>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{detalle.id}</p>
            </div>
          </div>
          {estadoConsultaBadge(detalle.estado)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card className="p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">Cliente</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Nombre</span><span className="text-gray-800">{detalle.nombre}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">WhatsApp</span><span className="text-gray-800">{detalle.cliente}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Recibido</span><span className="text-gray-800">{detalle.recibido} <span className="text-gray-400">(fuera de horario)</span></span></div>
            </div>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">Formulario respondido</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Producto</span><span className="text-gray-800">{detalle.producto}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Cantidad</span><span className="text-gray-800">{detalle.cantidad} unidades</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Urgencia</span><span className="text-gray-800">{detalle.urgencia}</span></div>
            </div>
          </Card>
        </div>

        <Card className="p-5 mb-4">
          <p className="text-sm font-medium text-gray-800 mb-3">Mensaje original</p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-sm text-gray-700">
            “{detalle.mensaje}”
          </div>
        </Card>

        <div className="flex gap-3">
          <button onClick={() => cambiarEstado(detalle.id, "Contactado")} className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg">
            Marcar como contactado
          </button>
          <button onClick={() => cambiarEstado(detalle.id, "Convertida")} className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
            Convertir en venta
          </button>
          <button onClick={() => cambiarEstado(detalle.id, "Descartada")} className="bg-white border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 text-sm font-medium px-4 py-2 rounded-lg">
            Descartar
          </button>
        </div>
      </div>
    );
  }

  const nuevas = consultas.filter((c) => c.estado === "Nueva").length;

  return (
    <div>
      <PageHeader
        title="Consultas Pendientes"
        subtitle="Formularios recibidos por WhatsApp fuera del horario laboral (18:00 – 09:00)"
      />
      {nuevas > 0 && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-sm text-amber-800">
          {nuevas} consulta{nuevas > 1 ? "s" : ""} nueva{nuevas > 1 ? "s" : ""} esperando contacto — cada una es una oportunidad de venta recuperable.
        </div>
      )}
      <Card className="p-5">
        <div className="flex gap-3 mb-4">
          <div className="w-72"><SearchInput value={q} onChange={setQ} placeholder="Buscar consultas..." /></div>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            <option value="__all__">__all__</option>
            <option>Nueva</option>
            <option>Contactado</option>
            <option>Convertida</option>
            <option>Descartada</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Recibido</th>
              <th className="pb-3 font-medium">Cliente</th>
              <th className="pb-3 font-medium">Producto solicitado</th>
              <th className="pb-3 font-medium text-right">Cantidad</th>
              <th className="pb-3 font-medium pl-6">Urgencia</th>
              <th className="pb-3 font-medium">Estado</th>
              <th className="pb-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className={`border-b border-gray-50 last:border-0 ${c.estado === "Nueva" ? "bg-amber-50/40" : ""}`}>
                <td className="py-3 text-gray-600 whitespace-nowrap">{c.recibido}</td>
                <td className="py-3">
                  <p className="text-gray-800">{c.nombre}</p>
                  <p className="text-xs text-gray-400">{c.cliente}</p>
                </td>
                <td className="py-3 text-gray-800">{c.producto}</td>
                <td className="py-3 text-right text-gray-800">{c.cantidad}</td>
                <td className="py-3 pl-6 text-gray-600">{c.urgencia}</td>
                <td className="py-3">{estadoConsultaBadge(c.estado)}</td>
                <td className="py-3 text-right text-gray-400">
                  <button onClick={() => setSel(c.id)} className="hover:text-gray-700"><Icon d={icons.eye} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Empleados() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => EMPLEADOS.filter((e) => (e.nombre + e.correo).toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div>
      <PageHeader title="Empleados" subtitle="Empleados" action={<GreenBtn>Nuevo Empleado</GreenBtn>} />
      <Card className="p-5">
        <div className="mb-4"><SearchInput value={q} onChange={setQ} placeholder="Buscar empleado..." /></div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">Nombre Completo</th>
              <th className="pb-3 font-medium">Correo Electrónico</th>
              <th className="pb-3 font-medium">Roles</th>
              <th className="pb-3 font-medium">Estado</th>
              <th className="pb-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 text-gray-800">{e.nombre}</td>
                <td className="py-3 text-gray-600">{e.correo}</td>
                <td className="py-3"><Badge tone="greenSoft">{e.rol}</Badge></td>
                <td className="py-3"><Badge tone="green">{e.estado}</Badge></td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-4 text-xs text-gray-500">
                    <button className="hover:text-gray-800">Asignar Rol</button>
                    <button className="hover:text-red-500">Desactivar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Roles() {
  return (
    <div>
      <PageHeader title="Roles y Permisos" subtitle="Administración" action={<GreenBtn>Nuevo Rol</GreenBtn>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {ROLES.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700"><Icon d={icons.shield} /></span>
              <p className="font-semibold text-gray-900">{r.nombre}</p>
            </div>
            <p className="text-sm text-gray-400 mb-4">{r.descripcion}</p>
            <p className="text-xs font-medium text-gray-500 mb-2">PERMISOS</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {r.permisos.map((p) => (
                <Badge key={p} tone="greenSoft">{p}</Badge>
              ))}
            </div>
            <p className="text-xs text-gray-400">{r.usuarios} usuario{r.usuarios > 1 ? "s" : ""} con este rol</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


/* ================= APP ================= */

export default function App() {
  const [page, setPage] = useState("inicio");
  const [ventaSel, setVentaSel] = useState(null);
  
  // Iniciamos la tabla vacía en vez de usar los datos inventados
  const [consultas, setConsultas] = useState([]); 

  useEffect(() => {
    const fetchConsultas = async () => {
      const { data, error } = await supabase
        .from('consultas')
        .select('*');
      
      if (error) {
        console.error("Error de Supabase:", error);
      } else {
        setConsultas(data || []);
      }
    };

    fetchConsultas(); 
    
    // El actualizador automático cada 3 segundos
    const interval = setInterval(fetchConsultas, 3000);
    return () => clearInterval(interval);
  }, []);

  const nuevas = consultas.filter((c) => c.estado === "Nueva").length;
  
  // ... abajo sigue la variable "const nav = [" y el resto del código original
  const nav = [
    { section: null, items: [{ id: "inicio", label: "Inicio", icon: icons.home }] },
    {
      section: "Inventario",
      items: [
        { id: "stock", label: "Stock", icon: icons.stock },
        { id: "movimientos", label: "Movimientos", icon: icons.mov },
      ],
    },
    {
      section: "Órdenes",
      items: [
        { id: "ventas", label: "Ventas", icon: icons.cart },
        { id: "consultas", label: "Consultas Pendientes", icon: icons.chat, badge: nuevas },
      ],
    },
    {
      section: "Administración",
      items: [
        { id: "empleados", label: "Empleados", icon: icons.users },
        { id: "roles", label: "Roles y Permisos", icon: icons.shield },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white text-sm font-bold">W</div>
          <span className="font-bold text-gray-900">Warehouse</span>
        </div>
        <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
          {nav.map((group, gi) => (
            <div key={gi}>
              {group.section && <p className="px-2 mb-1 text-[11px] text-gray-400">{group.section}</p>}
              <div className="space-y-0.5">
                {group.items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => { setPage(it.id); setVentaSel(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors ${
                      page === it.id ? "bg-gray-200/80 text-gray-900 font-medium" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon d={it.icon} size={15} />
                      {it.label}
                    </span>
                    {it.badge > 0 && (
                      <span className="bg-amber-400 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {it.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-500">AD</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">Admin General</p>
              <p className="text-[10px] text-gray-400 truncate">admin@warehouse.cl</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white min-h-full m-3 rounded-xl border border-gray-200 p-8">
          {page === "inicio" && <Inicio consultas={consultas} setPage={setPage} />}
          {page === "stock" && <Stock />}
          {page === "movimientos" && <Movimientos />}
          {page === "ventas" && <Ventas ventaSel={ventaSel} setVentaSel={setVentaSel} />}
          {page === "consultas" && <Consultas consultas={consultas} setConsultas={setConsultas} />}
          {page === "empleados" && <Empleados />}
          {page === "roles" && <Roles />}
        </div>
      </main>
    </div>
  );
}
