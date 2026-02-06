import { Search, Filter, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Parc Solaire Méditerranée',
    category: 'Énergie Renouvelable',
    porteur: 'SolarTech Solutions',
    description: 'Installation de 5 000 panneaux solaires photovoltaïques dans le sud de la France pour une production annuelle de 2.5 MW. Le projet permettra d\'alimenter environ 1 200 foyers en énergie propre.',
    image: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzAzOTI0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '500 000 €',
    duree: '12 mois',
    localisation: 'Marseille, France',
    dateDepot: '15 Jan 2026',
    statut: 'En évaluation',
    secteur: 'Énergie',
  },
  {
    id: 2,
    title: 'Résidence Le Panorama',
    category: 'Immobilier',
    porteur: 'Groupe Immobilier Lyon',
    description: 'Construction d\'une résidence de standing comprenant 32 appartements T2 à T4 dans le 6ème arrondissement de Lyon. Le projet inclut des espaces verts, un parking souterrain et des commerces en rez-de-chaussée.',
    image: 'https://images.unsplash.com/photo-1768742118995-191a71110ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwZGV2ZWxvcG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzA0MTI3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '1 200 000 €',
    duree: '24 mois',
    localisation: 'Lyon, France',
    dateDepot: '22 Jan 2026',
    statut: 'En évaluation',
    secteur: 'Immobilier',
  },
  {
    id: 3,
    title: 'Tech Hub - IA Énergétique',
    category: 'Technologie',
    porteur: 'InnoTech AI',
    description: 'Développement d\'une plateforme d\'intelligence artificielle pour optimiser la consommation énergétique des bâtiments tertiaires. Solution SaaS avec prédictions en temps réel et recommandations automatisées.',
    image: 'https://images.unsplash.com/photo-1514063364532-5abd25e38290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3RhcnR1cCUyMGlubm92YXRpb258ZW58MXx8fHwxNzcwNDEyNzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '300 000 €',
    duree: '18 mois',
    localisation: 'Paris, France',
    dateDepot: '28 Jan 2026',
    statut: 'Nouveau',
    secteur: 'Technologie',
  },
  {
    id: 4,
    title: 'Ferme Bio Provence',
    category: 'Agriculture Durable',
    porteur: 'BioTerre Provence',
    description: 'Extension d\'une exploitation agricole biologique de 50 hectares avec production maraîchère diversifiée, élevage en plein air et transformation à la ferme. Vente en circuit court et AMAP.',
    image: 'https://images.unsplash.com/photo-1721928005280-a5ac7cc2c50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlJTIwZmFybWluZ3xlbnwxfHx8fDE3NzAzMTA4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '400 000 €',
    duree: '36 mois',
    localisation: 'Avignon, France',
    dateDepot: '02 Fév 2026',
    statut: 'Nouveau',
    secteur: 'Agriculture',
  },
  {
    id: 5,
    title: 'Éolienne Maritime Atlantique',
    category: 'Énergie Renouvelable',
    porteur: 'WindSea Energy',
    description: 'Installation de 3 éoliennes offshore au large de la Bretagne pour une capacité totale de 15 MW. Projet en partenariat avec les collectivités locales et respect de la biodiversité marine.',
    image: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzAzOTI0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '2 500 000 €',
    duree: '48 mois',
    localisation: 'Brest, France',
    dateDepot: '05 Fév 2026',
    statut: 'En révision',
    secteur: 'Énergie',
  },
  {
    id: 6,
    title: 'Hôtel Écologique Alpes',
    category: 'Tourisme',
    porteur: 'Alpine Green Hotels',
    description: 'Construction d\'un hôtel 4 étoiles éco-responsable de 45 chambres avec spa et restaurant gastronomique. Architecture bioclimatique, matériaux locaux et gestion durable des ressources.',
    image: 'https://images.unsplash.com/photo-1768742118995-191a71110ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwZGV2ZWxvcG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzA0MTI3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    montant: '3 200 000 €',
    duree: '30 mois',
    localisation: 'Chamonix, France',
    dateDepot: '06 Fév 2026',
    statut: 'Nouveau',
    secteur: 'Tourisme',
  },
];

const statutColors: Record<string, string> = {
  'Nouveau': 'bg-green-100 text-green-800',
  'En évaluation': 'bg-blue-100 text-blue-800',
  'En révision': 'bg-orange-100 text-orange-800',
  'Approuvé': 'bg-emerald-100 text-emerald-800',
  'Refusé': 'bg-red-100 text-red-800',
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState('Tous');
  const [selectedStatut, setSelectedStatut] = useState('Tous');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.porteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSecteur = selectedSecteur === 'Tous' || project.secteur === selectedSecteur;
    const matchesStatut = selectedStatut === 'Tous' || project.statut === selectedStatut;
    
    return matchesSearch && matchesSecteur && matchesStatut;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl">Projets Proposés</h1>
              <p className="text-gray-600 mt-1">
                {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} en attente d'évaluation
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm py-1 px-3">
                Dernière mise à jour : 06 Fév 2026
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un projet, porteur..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={selectedSecteur} onValueChange={setSelectedSecteur}>
              <SelectTrigger>
                <SelectValue placeholder="Secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les secteurs</SelectItem>
                <SelectItem value="Énergie">Énergie</SelectItem>
                <SelectItem value="Immobilier">Immobilier</SelectItem>
                <SelectItem value="Technologie">Technologie</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Tourisme">Tourisme</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatut} onValueChange={setSelectedStatut}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les statuts</SelectItem>
                <SelectItem value="Nouveau">Nouveau</SelectItem>
                <SelectItem value="En évaluation">En évaluation</SelectItem>
                <SelectItem value="En révision">En révision</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-4 right-4 ${statutColors[project.statut]}`}>
                  {project.statut}
                </Badge>
                <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                  {project.category}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Porteur : <span className="font-medium">{project.porteur}</span>
                    </CardDescription>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-500">Montant demandé</div>
                        <div className="font-semibold">{project.montant}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">Durée</div>
                        <div className="font-semibold">{project.duree}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-xs text-gray-500">Localisation</div>
                        <div className="font-medium text-sm">{project.localisation}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-500">Date de dépôt</div>
                        <div className="font-medium text-sm">{project.dateDepot}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Examiner le dossier</Button>
                    <Button variant="outline">Détails</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600">Aucun projet trouvé</h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </main>
    </div>
  );
}
