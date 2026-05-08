// =============================================

// KONKER – Ethiopian Rummy 41

// REST API Client

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T> {


data: T;

message?: string;

}

class ApiClient {

private token: string | null = null;

setToken(token: string) {

this.token = token;

}

private async request<T>(

endpoint: string,

options: RequestInit = {}

): Promise<ApiResponse<T>> {

const config: RequestInit = {

headers: {

'Content-Type': 'application/json',

...(this.token && { Authorization: `Bearer ${this.token}` })

},

...options

};

const response = await fetch(`${API_BASE}${endpoint}`, config);


const data = await response.json();

if (!response.ok) {

throw new Error(data.message || 'API request failed');

}

return data;

}

// Auth

async login(nickname: string, pin?: string) {

return this.request<{ token: string; player_id: string }>('/auth/login', {

method: 'POST',

body: JSON.stringify({ nickname, pin })

});

}

// Stats

async getLeaderboard() {

return this.request<Array<{ nickname: string; wins: number; avg_score: number
}>>('/stats/leaderboard');

}

async getPlayerStats(playerId: string) {

return this.request('/stats/player/' + playerId);


## }

## }

export const api = new ApiClient();
