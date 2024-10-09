from math import radians, sin, cos, sqrt, atan2

def calculate_recommendations(flights, ip_coord):
    recommendations = []

    for flight in flights:
        distance = haversine(ip_coord, flight["flight_coord"])
        if flight["price"] > 0:
            ponderado = distance / flight["price"]
            recommendations.append((ponderado, flight))
    
    # Ordenar las recomendaciones por ponderado ascendente (mejores ponderadores primero)
    recommendations.sort(key=lambda x: x[0])

    # Obtener los 3 mejores vuelos
    best_recommendations = recommendations[:3]
    
    # Devolver los vuelos recomendados
    return [rec[1] for rec in best_recommendations]

def haversine(coord1, coord2):
    R = 6371.0

    lat1 = radians(coord1["lat"])
    lon1 = radians(coord1["lon"])
    lat2 = radians(coord2["lat"])
    lon2 = radians(coord2["lon"])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance