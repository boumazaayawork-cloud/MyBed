'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredOrders, updateOrderStatus, OrderRecord, saveProductPriceOverride, fetchCloudOrders } from '@/lib/store';
import { PRODUCTS, Product } from '@/data/products';
import { 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Truck, 
  Phone, 
  MessageCircle, 
  Printer, 
  Eye, 
  Filter, 
  Search,
  Package,
  Layers,
  ArrowLeft,
  X
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrders(getStoredOrders());
    setMounted(true);

    // Fetch from cloud database
    fetchCloudOrders().then((cloudData) => {
      if (cloudData && cloudData.length > 0) {
        setOrders(cloudData);
      }
    });

    const handleUpdate = () => setOrders(getStoredOrders());
    window.addEventListener('orders_updated', handleUpdate);
    return () => window.removeEventListener('orders_updated', handleUpdate);
  }, []);

  if (!mounted) return null;

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalDeposits = orders.reduce((sum, o) => sum + o.depositAmount, 0);
  const pendingCount = orders.filter((o) => o.status === 'PENDING_DEPOSIT' || o.status === 'DEPOSIT_CONFIRMED').length;
  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED_PAID').length;

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterStatus === 'ALL' ? true : order.status === filterStatus;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.wilayaName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderRecord['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'PENDING_DEPOSIT':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">En attente d'acompte (BaridiMob)</span>;
      case 'DEPOSIT_CONFIRMED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Acompte Validé / En Fabrication</span>;
      case 'SHIPPED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">Expédié / Chez le Livreur</span>;
      case 'DELIVERED_PAID':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Livré & Soldé (Payé)</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">Annulé</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-20">
      
      {/* Top Admin Header */}
      <header className="bg-navy-900 text-white border-b border-stone-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/fr" 
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voir le site</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-extrabold tracking-tight">
                My Bed <span className="text-gold-500 font-sans text-xs uppercase tracking-widest">Espace Gérant</span>
              </h1>
              <p className="text-[11px] text-stone-400">Gestion des Commandes, Acomptes & Livraisons 58 Wilayas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-stone-300 hidden sm:inline-block">Système en direct</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Chiffre d'Affaires</span>
              <span className="text-2xl font-black text-navy-900 mt-1 block">
                {totalRevenue.toLocaleString()} <span className="text-xs font-normal text-stone-500">DA</span>
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">Commandes enregistrées</span>
            </div>
            <div className="w-12 h-12 bg-navy-900/5 text-navy-900 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold-600" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Acomptes Reçus</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                {totalDeposits.toLocaleString()} <span className="text-xs font-normal text-stone-500">DA</span>
              </span>
              <span className="text-[11px] text-stone-500">Edahabia & BaridiMob</span>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">À Traiter / En Cours</span>
              <span className="text-2xl font-black text-amber-700 mt-1 block">
                {pendingCount}
              </span>
              <span className="text-[11px] text-stone-500">Appel ou fabrication</span>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Livrées & Soldées</span>
              <span className="text-2xl font-black text-purple-700 mt-1 block">
                {deliveredCount}
              </span>
              <span className="text-[11px] text-stone-500">Espèces perçues</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher par N°, client, wilaya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-navy-900 bg-stone-50/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {[
              { id: 'ALL', label: 'Toutes' },
              { id: 'PENDING_DEPOSIT', label: 'En attente d\'acompte' },
              { id: 'DEPOSIT_CONFIRMED', label: 'Acompte Validé' },
              { id: 'SHIPPED', label: 'En Livraison' },
              { id: 'DELIVERED_PAID', label: 'Livrées & Soldées' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-stone-200 text-center text-stone-500 text-sm">
              Aucune commande trouvée avec ces critères.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-5"
              >
                {/* Header line of the order */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-navy-900">
                      #{order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-xs text-stone-500">
                    Date : {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Main Order Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Customer & Address Details (4 cols) */}
                  <div className="lg:col-span-4 space-y-2 text-xs">
                    <div className="font-bold text-sm text-navy-900">{order.customerName}</div>
                    <div className="flex items-center gap-2 text-stone-600" dir="ltr">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <a href={`tel:${order.customerPhone}`} className="hover:underline font-semibold text-navy-900">
                        {order.customerPhone}
                      </a>
                    </div>
                    <div className="text-stone-600">
                      <span className="font-semibold text-stone-900">Destination :</span> {order.wilayaName} ({order.commune})
                    </div>
                    {order.notes && (
                      <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 italic">
                        Remarques : {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Purchased Items (5 cols) */}
                  <div className="lg:col-span-5 space-y-2 text-xs">
                    <span className="font-bold text-stone-500 uppercase text-[10px] block">Articles Commandés</span>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 border border-stone-200">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border bg-white">
                            <Image src={item.image} alt={item.name_fr} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <div className="font-bold text-stone-900">{item.name_fr}</div>
                            <div className="text-stone-500 text-[11px]">
                              {item.dimension} {item.color ? `• ${item.color}` : ''} (Qté: {item.quantity})
                            </div>
                          </div>
                          <div className="font-bold text-navy-900">
                            {(item.price * item.quantity).toLocaleString()} DA
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Balance & Payment Status (3 cols) */}
                  <div className="lg:col-span-3 space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Montant Total :</span>
                      <span className="font-extrabold text-navy-900">{order.total.toLocaleString()} DA</span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-700 font-semibold pt-1 border-t border-stone-200">
                      <span>Acompte ({order.paymentMethod === 'edahabia' ? 'Edahabia' : 'BaridiMob'}) :</span>
                      <span>{order.depositAmount.toLocaleString()} DA</span>
                    </div>

                    <div className="flex justify-between items-center text-amber-900 font-black pt-1 border-t border-stone-200">
                      <span>Reste au Livreur :</span>
                      <span>{order.balanceDue.toLocaleString()} DA</span>
                    </div>

                    {order.receiptImage && (
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(order.receiptImage || null)}
                        className="w-full mt-2 py-1.5 px-3 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-navy-900" />
                        <span>Voir le Reçu BaridiMob</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Actions Footer Bar */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-stone-700">Changer statut :</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderRecord['status'])}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-semibold text-xs focus:ring-2 focus:ring-navy-900"
                    >
                      <option value="PENDING_DEPOSIT">En attente d'acompte</option>
                      <option value="DEPOSIT_CONFIRMED">Acompte Validé / En Fabrication</option>
                      <option value="SHIPPED">Expédié / En Route</option>
                      <option value="DELIVERED_PAID">Livré & Soldé</option>
                      <option value="CANCELLED">Annulé</option>
                    </select>
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-navy-900" />
                      <span>Appeler</span>
                    </a>

                    <a
                      href={`https://wa.me/213${order.customerPhone.replace(/^0/, '')}?text=${encodeURIComponent(`Bonjour ${order.customerName}, ici la menuiserie My Bed concernant votre commande #${order.orderNumber}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/fr/order-success?orderId=${order.id}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Bon de Livraison</span>
                    </Link>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Catalog Overview Accordion with Price Editor */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Catalogue Produits & Gestion des Prix</h2>
              <p className="text-xs text-stone-500">Cliquez sur n'importe quel produit pour modifier ses prix ou dimensions en direct</p>
            </div>
            <span className="px-3 py-1 bg-gold-100 text-gold-900 rounded-full text-xs font-bold w-fit">
              {PRODUCTS.length} Produits Modifiables
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setEditingProduct(p)}
                className="p-3 rounded-xl bg-stone-50 hover:bg-gold-50/50 border border-stone-200 hover:border-gold-400 text-xs text-center space-y-1.5 transition-all group cursor-pointer"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white border">
                  <Image src={p.image} alt={p.name_fr} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-navy-900/80 text-white rounded text-[9px] font-bold">
                    Modifier
                  </span>
                </div>
                <div className="font-bold text-stone-900 truncate">{p.name_fr}</div>
                <div className="text-[11px] text-gold-700 font-extrabold">{p.base_price.toLocaleString()} DA</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Modal to Edit Product Prices */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border">
                  <Image src={editingProduct.image} alt={editingProduct.name_fr} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-navy-900">{editingProduct.name_fr}</h3>
                  <p className="text-xs text-stone-500 font-arabic">{editingProduct.name_ar}</p>
                </div>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Prix de base affiché (DA)
                </label>
                <input
                  type="number"
                  defaultValue={editingProduct.base_price}
                  id="edit-base-price"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold focus:ring-2 focus:ring-navy-900"
                />
              </div>

              {editingProduct.variants && editingProduct.variants.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-700 block">
                    Prix par Dimension :
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {editingProduct.variants.map((v) => (
                      <div key={v.id} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                        <span className="font-semibold text-stone-800">{v.dimension}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            defaultValue={v.price}
                            id={`variant-${v.id}`}
                            className="w-24 px-2 py-1 border rounded-lg text-right font-bold text-navy-900"
                          />
                          <span className="text-stone-500 text-[11px]">DA</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  const baseInput = document.getElementById('edit-base-price') as HTMLInputElement;
                  const newBase = baseInput ? parseInt(baseInput.value) : editingProduct.base_price;
                  const variantMap: Record<string, number> = {};
                  editingProduct.variants.forEach((v) => {
                    const vInput = document.getElementById(`variant-${v.id}`) as HTMLInputElement;
                    if (vInput) variantMap[v.id] = parseInt(vInput.value);
                  });
                  saveProductPriceOverride(editingProduct.id, newBase, variantMap);
                  alert('Prix mis à jour avec succès !');
                  setEditingProduct(null);
                }}
                className="px-6 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-stone-950 text-xs font-extrabold shadow-md transition-all"
              >
                Enregistrer les Prix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to view BaridiMob Receipt */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-bold text-sm">Reçu de Versement BaridiMob</span>
              <button onClick={() => setSelectedReceipt(null)} className="p-1 rounded-full hover:bg-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-96 bg-stone-100 rounded-xl overflow-hidden">
              <Image src={selectedReceipt} alt="Reçu BaridiMob" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
